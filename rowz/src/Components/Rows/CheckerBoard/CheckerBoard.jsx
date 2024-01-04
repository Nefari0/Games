import { updatePlayer } from '../../../redux/checkerReducer'
import { updateNotice,updateAlert } from '../../../redux/globalReducer'
import {connect} from 'react-redux'
import { ErrorMsg } from '../Error/error.component'
import { attackLogic } from './attack.logic'
import { CheckerTable,Rowz } from './board.styles'
import { Menu } from '../Menu/menu.component'
import React, { Component } from 'react'
import Tile from '../Tile/tile.component'
import Piece from '../Tile/Piece/piece.component'
import pieces from '../pieces'
import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket(`ws://127.0.0.1:8003`); // production
const client = new W3CWebSocket(`ws://165.227.102.189:8003`); // build

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
            chainKillAvailable:false,
            moveOptions:null,
            errorMessage:null,
            goodPieceCount:12,
            badPieceCount:12,
            clientId:null,
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
        this.checkIfWinner = this.checkIfWinner.bind(this)
        this.ping = this.ping.bind(this)
    };

    async componentDidMount() {
        await this.getUniqueID()
        await this.boardFactory()
        await this.getConnected()
        await this.loadGame()
    };

    getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const id = s4() + s4() + '-' + s4();
        if (!this.state.clientId) {
            this.setState({
                clientId:id
            })
        }
        return 
    };

    getConnected = () => {
        client.onopen = () => {
            console.log('client connected')
            if (this.state.clientId) {this.ping()}
        }
        client.onmessage = (message) => {
            const { currentGame } = this.props
            const dataFromServer = JSON.parse(message.data);
            const { gameID,input,type } = dataFromServer
            if (type === 'ping') {
                if (dataFromServer.clientId === this.state.clientId) {this.ping()}
            }
            
            if (type === 'checkerTurn' && gameID === currentGame ) {
                // --- Save game on browsers --- //
                this.saveGame(message.data)
                // ----------------------- //
                const { previousPiece,newPieces,currentPlayer,autoTurn } = input
                const pieceCount = (player) => newPieces.filter((el) => el.player === player).length
                newPieces.forEach(el => el.pendingDeath = false)
                this.setState({
                    pieces:newPieces,
                    previousPiece:previousPiece,
                    currentPlayer:currentPlayer,
                    goodPieceCount:pieceCount('good'),
                    badPieceCount:pieceCount('bad')
                })
                this.switchPlayer(currentPlayer)
                this.checkIfWinner()

                if (this.state.chainKillAvailable === true) {
                    const { x,y } = previousPiece
                    this.setState({
                        activeLocation:[x,y,previousPiece],
                    })
                } else {
                    if (!autoTurn) {this.mandatoryAttack()}
                }           
            }
        }
    };

    sendToSocketsSwitch = (input) => {
        // this.kingAll()
        const { currentGame } = this.props
        this.setState({activeLocation:[null,null]})
        var gameObject = {
            type:"checkerTurn",
            input,
            gameID:currentGame
        }
        gameObject = JSON.stringify(gameObject)
        client.send(gameObject)
    };

    ping = () => {
        if (this.props.globalReducer.devToolsOn) {console.log('SERVER PING')}
        var pingObject = {type:'ping',clientId:this.state.clientId}
        client.send(JSON.stringify(pingObject));
    }

    // pong = () => {
    //     // clearTimeout(300);
    //     this.ping()

    //     // client.onopen = function () {
    //     //     setInterval(this.ping(), 300);
    //     // }
    //     client.onmessage = function (evt) {
    //         var msg = JSON.parse(evt.data);
    //         if (msg.type == 'ping') {
    //             console.log('HITTING PONG',msg)
    //             // this.ping();
    //             return;
    //         }
    //         //////-- other operation --//
    //     }
    // }

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

    saveGame = (items) => {
            localStorage.setItem('savedGame',items)
    }

    loadGame = () => {
        const pieces = localStorage.getItem('savedGame')
        try {
            if (pieces) {
                const data = JSON.parse(pieces)
                const { input } = data
                const { currentPlayer,previousPiece } = input
                this.switchPlayer(currentPlayer)
                this.setState({
                    pieces:data.input.newPieces,
                    previousPiece:previousPiece,
                })
            } else {
                this.newGame()
            }
        } catch (err) {
            return
        }
    }

    newGame = () => {
        this.setState({pieces:pieces})
        this.saveGame('')
        const gameObject = {
            newPieces:pieces,
            currentPlayer:this.state.currentPlayer,
        }
        this.sendToSocketsSwitch(gameObject)
    }

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
            pieces:pieces,
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
        var enemyPieces = pieces.filter((el) => el.player !== currentPlayer)

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

    setMoves = async (x,y,currentPiece) => { // gets all move options based on active location
        const { matrix,pieces,currentPlayer } = this.state
        const { isKing,id } = currentPiece[0]
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
                    if (!attackCoordinates) {return this.props.updateNotice('This move is not allowed')}
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
        return await this.executeMovePiece(x,y,id,currentPlayer,isKing)
    }

    // --- makes actual movements --- //
    executeMovePiece = (x,y,id,currentPlayer,isKing) => {
        const { pieces,matrix,activeLocation } = this.state
        const landingY = activeLocation[1]
        var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        // --- Is location on the board? --- //
        if (x >= 0 && x <= matrix.length-1) {
            if (y >= 0 && y <= matrix.length-1) {
                
                // --- non-kings can only move one direction --- //
                if (landingY > y && currentPlayer === 'good'){
                    if(!isKing){
                        return this.props.updateNotice('This move is not allowed')
                    }
                };
                if (landingY < y && currentPlayer === 'bad'){
                    if(!isKing){
                        return this.props.updateNotice('This move is not allowed')
                    } 
                };
                updatePieces[pieceIndex].x = x
                updatePieces[pieceIndex].y = y
                
                // --- becomes king --- //
                if(updatePieces[pieceIndex].player === 'bad' && updatePieces[pieceIndex].y === 0 ){
                    updatePieces[pieceIndex].isKing = true
                } else if (updatePieces[pieceIndex].player === 'good' && updatePieces[pieceIndex].y === matrix.length-1) {
                    updatePieces[pieceIndex].isKing = true
                };
        
                var sendInfo = {
                    newPieces:updatePieces,
                    currentPlayer:this.state.currentPlayer,
                    previousPiece:updatePieces[pieceIndex],
                }
                this.sendToSocketsSwitch(sendInfo)
            }
        }

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
    };

    switchPlayer = async (input) => {
        switch (input) {
            case 'good':
                this.setState({currentPlayer:'bad'})
                this.props.updatePlayer({currentPlayer:"bad"})
                break;
            case 'bad':
                this.setState({currentPlayer:'good'})
                this.props.updatePlayer({currentPlayer:"good"})
                break;
            default:
                return
        };
    };

    selectTile = (x,y,piece) => {
        const { currentPlayer } = this.state
        const newActiveLocation = [x,y,piece]
        if(piece[0] !== undefined) {
            if (piece[0].player === currentPlayer) {
                this.handleInput('activeLocation',newActiveLocation)
            } else {this.props.updateNotice('NOT YOUR TURN!')}
        } else {this.unselectTile()}
        return
    };
    
    unselectTile = () => {
        this.handleInput('activeLocation',[null,null])
    };

    checkIfWinner = () => {
        const { goodPieceCount,badPieceCount } = this.state
        const good = goodPieceCount === 0
        const bad = badPieceCount === 0
        if (good || bad) {this.props.updateNotice((bad ? `black` : `white`)+' wins!')}
    }

    handleInput = (prop,val) => {
        this.setState({[prop]:val})
        return
    };

    render() {

        const {
            matrix,
            pieces,
            activeLocation,
            currentPlayer,
            tileIsSelected,
            moveOptions,
            chainKillAvailable,
            previousPiece,
            errorMessage
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
        });

        const mappedPieces = pieces.map(el => {
            return (
                <Piece
                    key={el.id} 
                    items={el} 
                    activeLocation={activeLocation}
                    pieceClass={el.player}
                />
            )
        });

        return(
            <div>
                <CheckerTable>
                    <Menu
                        newGame={this.newGame}
                    />
                    {errorMessage && <ErrorMsg />}
                    <Rowz>
                        {mappedPieces}
                        {mappedMatrix}
                    </Rowz>
                </CheckerTable>
            </div>
        );
    }
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps, {updatePlayer,updateNotice,updateAlert})(CheckerBoard)