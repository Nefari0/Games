import { attackLogic,chainAttacksLogic } from './attack.logic'
import { CheckerTable,Rowz,OpacityLens } from './board.styles'
import React, { Component } from 'react'
import Tile from '../Tile/tile.component'
import Piece from '../Tile/Piece/piece.component'
import pieces from '../../pieces'
import CurrentPlayer from '../TurnIndicator/current.component'
import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket(`ws://127.0.0.1:8003`); // production
const client = new W3CWebSocket(`ws://165.227.102.189:8000`); // build

const upLeft = [-1,-1]
const upRight = [1,-1]
const downLeft = [-1,1]
const downRight = [1,1]
const moves = [upLeft,upRight,downLeft,downRight]

class CheckerBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previousPiece:null,
            activeLocation:[null,null], // --- Player selects tile
            pieces:[],
            matrix:[],
            currentPlayer:'bad',
            tileIsSelected:1, // --- Changes opacity
            chainKillAvailable:false,
            moveOptions:null,
        }
        this.selectTile = this.selectTile.bind(this)
        this.boardFactory = this.boardFactory.bind(this)
        this.getConnected = this.getConnected.bind(this)
        this.sendToSocketsSwitch = this.sendToSocketsSwitch.bind(this)
        this.setMoves = this.setMoves.bind(this)
        this.executeMovePiece = this.executeMovePiece.bind(this)
        this.killPiece = this.killPiece.bind(this)
        this.checkPieceLocations = this.checkPieceLocations.bind(this)
        this.switchPlayer = this.switchPlayer.bind(this)
        this.unselectTile = this.unselectTile.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.kingAll = this.kingAll.bind(this)
    };

    componentDidMount() {
        this.setState({pieces:pieces})
        this.boardFactory()
        this.getConnected()
    };
    
    getConnected = () => {
        client.onopen = () => {
            console.log('client connected')
        }
        client.onmessage = (message) => {
        
            const dataFromServer = JSON.parse(message.data);

            if (dataFromServer.type === 'checkerTurn' ) {
                const { previousPiece,newPieces,currentPlayer,autoTurn } = dataFromServer.input
                newPieces.forEach(el => el.pendingDeath = false)
                this.setState({
                    pieces:newPieces,
                    previousPiece:previousPiece,
                    currentPlayer:currentPlayer
                })

                this.switchPlayer(currentPlayer)

                if (this.state.chainKillAvailable === true) {
                    const { x,y } = previousPiece
                    this.setState({
                        activeLocation:[x,y,previousPiece],
                        // chainKillAvailable:false,
                        // previousPiece:null
                    })
                } else {
                    if (!autoTurn) {this.mandatoryAttack()}
                }           
            }
        }
    };

    // --- this function makes all pieces king - it's purpose is strictly for testing moves in all direction --- //
    kingAll = () => {
        const { pieces } = this.state
        var updatePieces = []
        pieces.forEach(el => {
            el.isKing = true
            updatePieces.push(el)
        })
        this.setState({pieces:updatePieces})
        
    };

    sendToSocketsSwitch = (input) => {
        // this.kingAll() // --- For testing
        const { currentPlayer,newPieces} = input
        const { playOnline } = this.props
        this.setState({activeLocation:[null,null]})
        if (playOnline === true) {
            client.send(JSON.stringify({type: "checkerTurn",input}))
        } else {
            this.switchPlayer(currentPlayer)
            this.setState({pieces:newPieces})
        }
    };

    boardFactory = () => {
        var matrix = []
        var numOfTiles = 8
        var M = Array.from(Array(numOfTiles)) // rows

        for(let i = 0; i < numOfTiles; i++){matrix.push(M)} // columns 

        this.setState({matrix:matrix})
    }

    smile = (x,y) => { // Display frown on piece when it's about to be attacked
        const { pieces } = this.state
        pieces.forEach(el => {if (el.x === x && el.y === y) {el.pendingDeath = true}})
        this.setState({
            piece:pieces,
            moveOptions:[x,y]
        })
    }

    garbageRemoval = async (param) => {
        const { nextX,nextY,id,enemyX,enemyY } = param
        const updatedPieces = await this.killPiece(enemyX,enemyY)
        const pieceIndex = await updatedPieces.findIndex(el => el.id === id)
        updatedPieces[pieceIndex].x = nextX
        updatedPieces[pieceIndex].y = nextY
        this.chainKills(updatedPieces,updatedPieces[pieceIndex],true)
        
        const sendInfo = {
            newPieces:updatedPieces,
            currentPlayer:this.state.currentPlayer,
            previousPiece:updatedPieces[pieceIndex],
            autoTurn:true
        }
        return this.sendToSocketsSwitch(sendInfo)
    }

    mandatoryAttack = async () => {
        const { pieces,currentPlayer } = this.state
        pieces.forEach(el => el.pendingDeath = false)
        var currentPieces = pieces.filter((el) => el.player === currentPlayer)
        var enemyPieces = pieces.filter((el) => el.player != currentPlayer)

        await currentPieces.forEach(el => {
            enemyPieces.forEach(enemy => {
                attackLogic(enemy.x,enemy.y,[el],this.state,this.checkPieceLocations).then(res => {
                    if (res != null) {
                        // this.garbageRemoval(res) // Still working out bugs
                        return this.smile(res.enemyX,res.enemyY)
                    }
                })
            })
        })
    }

    // --- Checks for chained attacks
    chainKills = (updatedPieces,currentPiece) => {
        const { matrix } = this.state
        const { player,x,y,isKing } = currentPiece
        var moveOptions = null

        moves.forEach(e => {
            var locatePiece = this.checkPieceLocations(x+e[0],y+e[1],updatedPieces)
            
            // --- check for adjacent pieces / is piece friend of foe? --- //
            if(locatePiece !== undefined && locatePiece.player !== player){
                
                // --- if it is a foe, is the next location over available? --- //
                var nextX = parseInt(e[0]) + locatePiece.x // potential jump to x
                var nextY = parseInt(e[1]) + locatePiece.y // potential jump to y
                var availMove = this.checkPieceLocations(nextX,nextY,updatedPieces) // are available "jump to" coordinates available

                if(availMove === undefined) {
                    
                    // -- is location on the board -- //
                    if(nextX >= 0 && nextX <= matrix.length-1){
                        if(nextY >= 0 && nextY <= matrix.length-1) {

                            // --- can move be made if isKing === false ? --- //
                            // --- "good" non-kings
                            if(player === "good" && nextY < y){
                                if(isKing === false){return}
                            }
                            
                            // --- "bad" non-kings
                            if(player === "bad" && nextY > y){
                                if(isKing === false){return}
                            }

                            moveOptions = [locatePiece.x,locatePiece.y]

                            this.setState({
                                moveOptions:moveOptions,
                                chainKillAvailable:true,
                            })
                            this.switchPlayer(player)
                            return
                        }
                    }
                    
                }
                
            }
            return
        })
    }

    setMoves = async (x,y,id,activeLocation,manualControl,currentPlayer,pieces,isKing,currentPiece) => { // gets all move options based on active location
        const { matrix } = this.state
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        this.setState({
            chainKillAvailable:false,
            previousPiece:null,
            moveOptions:null
        })

        if(currentPlayer !== pieces[pieceIndex].player){
            return
        }

        // --- this checks all pieces on board for available locations/moves --- //
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                if(pieces[key].player !== currentPlayer){
                    
                    // if the chosen move already contains a piece, check if friend or foe
                    const attackCoordinates = await attackLogic(pieces[key].x,pieces[key].y,currentPiece,this.state,this.checkPieceLocations)
                    if (!attackCoordinates) {return console.log('This move is not allowed')}
                    const { nextX,nextY,enemyX,enemyY,id } = attackCoordinates

                    // --- Make attack --- //
                    const updatedPieces = await this.killPiece(enemyX,enemyY)
                    pieceIndex = updatedPieces.findIndex((el) => el.id === id)
                    updatedPieces[pieceIndex].x = nextX
                    updatedPieces[pieceIndex].y = nextY

                    // -- piece becomes king if "good" AND at max-y location -- //
                    if (updatedPieces[pieceIndex].player === 'good' && updatedPieces[pieceIndex].y === matrix.length-1) {
                        updatedPieces[pieceIndex].isKing = true
                    }

                    // -- piece becomes king if "bad" AND at min-y location -- //
                    if(updatedPieces[pieceIndex].player === 'bad' && updatedPieces[pieceIndex].y === 0 ){
                        updatedPieces[pieceIndex].isKing = true
                    }
    
                    // -- make chain attack if available -- //
                    this.chainKills(updatedPieces,updatedPieces[pieceIndex],true)
                    var sendInfo = {
                        newPieces:updatedPieces,
                        currentPlayer:this.state.currentPlayer,
                        previousPiece:updatedPieces[pieceIndex]
                    }
                    this.sendToSocketsSwitch(sendInfo)
                    return 
                    } else {return}
            }
        }
        if(manualControl === true){return await this.executeMovePiece(x,y,activeLocation[1],id,currentPlayer,isKing)} else {return}
    }

    // --- makes actual movements --- //
    executeMovePiece = (x,y,landingY,id,currentPlayer,isKing) => {
        const { pieces,matrix } = this.state
        var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        // --- non-kings can only move one direction --- //
        if (landingY > y && currentPlayer === 'good'){
            if(!isKing){
                return console.log('this move is not allowed')
            } 
        }
        if (landingY < y && currentPlayer === 'bad'){
            if(!isKing){
                return console.log('this move is not allowed')
            } 
        }
        updatePieces[pieceIndex].x = x
        updatePieces[pieceIndex].y = y
        
        // --- becomes king --- //
        if(updatePieces[pieceIndex].player === 'bad' && updatePieces[pieceIndex].y === 0 ){
            updatePieces[pieceIndex].isKing = true
        } else if (updatePieces[pieceIndex].player === 'good' && updatePieces[pieceIndex].y === matrix.length-1) {
            updatePieces[pieceIndex].isKing = true
        } 

        var sendInfo = {
            newPieces:updatePieces,
            currentPlayer:this.state.currentPlayer,
            previousPiece:updatePieces[pieceIndex],
        }
        this.sendToSocketsSwitch(sendInfo)
    }

    // --- attacks and removes piece from play --- //
    killPiece = async (enemyX,enemyY,id) => {
        const { pieces } = this.state
        var updatedPieces = [...pieces]
        // var pieceIndex = pieces.findIndex((el) => el.id === id)
        var pieceId = await this.checkPieceLocations(enemyX,enemyY).id
        var killIndex = pieces.findIndex((el) => el.id === pieceId)
        updatedPieces.splice(killIndex,1)
        
        return updatedPieces
    }

    // -- checks location for availability -- //
    checkPieceLocations = (x,y,updatedPieces) => {
        const { pieces } = this.state

        // -- this is for chain kills -- //
        if(updatedPieces != null){
            for (let key in updatedPieces){
                if(updatedPieces[key].x === x && updatedPieces[key].y === y){
                    return updatedPieces[key]
                }
            }
            // -- this is for manual kills -- //
        } else {
            for (let key in pieces){
                if(pieces[key].x === x && pieces[key].y === y){
                    return pieces[key]
                }
            }
        }
        
    }

    switchPlayer = async (input) => {
        switch (input) {
            case 'good':
                this.setState({currentPlayer:'bad'})
                break;
            case 'bad':
                this.setState({currentPlayer:'good'})
        }
        return
    }

    selectTile = (x,y,piece) => {
        const newActiveLocation = [x,y,piece]
        if(piece[0] != undefined) {
            this.handleInput('activeLocation',newActiveLocation)
            this.handleInput('tileIsSelected',.4)
        }
        return
    }
    
    unselectTile = () => {
        this.handleInput('tileIsSelected',1)
        this.handleInput('activeLocation',[null,null])
    }

    handleInput = (prop,val) => {
        this.setState({[prop]:val})
        return
    }

    render() {

        const {
            matrix,
            pieces,
            activeLocation,
            currentPlayer,
            tileIsSelected,
            moveOptions,
            chainKillAvailable,
            previousPiece
        } = this.state

        const mappedMatrix = matrix.map((row,id) => {
            return row.map((col,id2) => {
                const currentPiece = pieces.filter(e => e.x === id2 && e.y === id)
                return (
                <Tile
                    key={[id2,id]}
                    x={id2}
                    y={id}
                    color={(-1)**(id+id2)}
                    selectTile={this.selectTile}
                    unselectTile={this.unselectTile}
                    setMoves={this.setMoves}
                    currentPiece={currentPiece}
                    currentPlayer={currentPlayer}
                    activeLocation={activeLocation}
                    tileIsSelected={tileIsSelected}
                    pieces={pieces}
                    moveOptions={moveOptions}
                    chainKillAvailable={chainKillAvailable}
                    previousPiece={previousPiece}
                />
                )
            })
        })

        const mappedPieces = pieces.map(el => {
            return (
                <Piece key={el.id} items={el} />
            )
        })

        return(
            <div>
                <CheckerTable>
                    <Rowz>
                        {mappedPieces}
                        {mappedMatrix}
                    </Rowz>
                </CheckerTable>
                <CurrentPlayer currentPlayer={currentPlayer} />
            </div>
        )
    }
}

export default CheckerBoard