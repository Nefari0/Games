// import { PieceFactory } from './Factory'
import './CheckerBoard.css'
import React, { Component } from 'react'
import Tile from './Tile'
import data from '.././data'
import pieces from '.././pieces'
import Piece from './Piece'
import { act } from 'react-dom/test-utils'
import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket(`ws://127.0.0.1:8001`); // production
const client = new W3CWebSocket(`ws://165.227.102.189:8002`); // build

class CheckerBoard extends Component {
    constructor() {
        super()

        this.state = {
            // M:Array.from(Array(9), () => Array.from(Array(9)));
            // M:[]
            // board:[
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            //     [null,null,null,null,null,null,null,null],
            // ],
            playerGood:{},
            playerBad:{},
            selectedPiece:{}, // 
            activeLocation:[null,null], // player selects tile
            // data:[],
            pieces:[],
            matrix:[],
            setPermission:true,
            currentPlayer:'bad',
            tileIsSelected:1,
            wasKillMade:false,
        }
        this.selectTile = this.selectTile.bind(this)
        this.boardFactory = this.boardFactory.bind(this)
        this.getConnected = this.getConnected.bind(this)
        // this.checkForKill = this.checkForKill.bind(this)
    }

    componentDidMount() {
        // console.log('is mounted',pieces)
        this.setState({pieces:pieces})
        this.boardFactory()
        this.getConnected()
        // this.populateMatrix(this.state.matrix)
        // this.setState({pieces:[...pieces]})
        // var M = Array.from(Array(3), () => Array.from(Array(8)).fill('adfdf'));
        // var M = Array.from(Array(3), () => Array.from(Array(8)).fill(null));
        // this.setState({board:[...M]})
    }

    getConnected = (input) => {
        client.onopen = () => {
            console.log('client connected')
        }
        client.onmessage = (message) => {
        
            const dataFromServer = JSON.parse(message.data);
            const { board,currentPlayer,pieces } = dataFromServer.input
            console.log(dataFromServer.input)
            // this.isSolved(board,currentPlayer)
            // console.log('got reply',currentPlayer)
            if (dataFromServer.type === 'checkerTurn' ) {
                this.setState({
                    pieces:dataFromServer.input.newPieces,
                    // currentPlayer:currentPlayer
                })
                this.switchPlayer(currentPlayer)
            }
        }
    }

    sendToSocketsSwitch = (input) => {
        console.log('hit sockets')
        client.send(JSON.stringify({type: "checkerTurn",input}))
    };

    boardFactory = () => {
    var matrix = []
    var numOfTiles = 8
    var M = Array.from(Array(numOfTiles)) // rows
    for(let i = 0; i < numOfTiles; i++){ // columns
    matrix.push(M)
        }
        this.setState({matrix:matrix})
    }

    // play

    // piece template
    // piece = {
        // id:'',
        // player:good / bad
        // location:[row][col], // should have default value for initial game
        // isInGame:true / false, // this indicates whether piece has not been jumped by opponent
        // isKing:false,
    // }

    // select which piece
        // each piece should have unique id

    // select which move
        // move can only happen if no other piece is there
        // can only move diagonally
        // can only move one tile
        // if other piece is opponent && next tile past opponent is empty:
            // move selected piece to empty square past opponent
            // remove opponent piece from play
    setMoves = (x,y,id) => { // gets all move options based on active location
        const { pieces,currentPlayer,activeLocation } = this.state
        var updatePieces = [...pieces]
        // console.log('pieces',pieces.findIndex())
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        if(currentPlayer != pieces[pieceIndex].player){
            return
        }

        // this checks all pieces on board for available locations/moves
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                if(pieces[key].player != currentPlayer){
                    return (
                        // if the chosen move already contains a piece, check if friend or foe
                        this.checkForKill(pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id)
                    )} else {return}
            }
        }
        updatePieces[pieceIndex].x = x
        updatePieces[pieceIndex].y = y
        this.setState({
            // pieces:updatePieces,
            activeLocation:[null,null],
            tileIsSelected:1
        })
        // this is the information send to socket
        var sendInfo = {
            newPieces:this.state.pieces,
            currentPlayer:this.state.currentPlayer
        }
            this.sendToSocketsSwitch(sendInfo)
    }

    checkForKill = async (enemyX,enemyY,currentX,currentY,id) => {
        const { pieces,currentPlayer,activeLocation } = this.state
        // var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        console.log('hit check for kill')
        console.log('x',currentX,'y',currentY,'current')
        console.log('x',enemyX,'y',enemyY,'enemy')

        if(currentX > enemyX && currentY < enemyY){
            if(this.checkPieceLocations(enemyX-1,enemyY+1) === undefined) {
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                console.log('you hit north east',updatePieces[pieceIndex])
                updatePieces[pieceIndex].x = enemyX-1
                updatePieces[pieceIndex].y = enemyY+1
                this.setState({
                    pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1,
                })

                var sendInfo = {
                    newPieces:this.state.pieces,
                    currentPlayer:this.state.currentPlayer
                }
                return this.sendToSocketsSwitch(sendInfo)

            }
        } else if (currentX > enemyX && currentY > enemyY) {
            if(this.checkPieceLocations(enemyX-1,enemyY-1) === undefined) {
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                updatePieces[pieceIndex].x = enemyX-1
                updatePieces[pieceIndex].y = enemyY-1
                this.setState({
                    pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1
                })
                var sendInfo = {
                    newPieces:this.state.pieces,
                    currentPlayer:this.state.currentPlayer
                }
                return this.sendToSocketsSwitch(sendInfo)
            }
        }
    }

    killPiece = async (enemyX,enemyY,id) => {
        const { pieces } = this.state
        var updatedPieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        console.log('here is kill piece')
        var pieceId = this.checkPieceLocations(enemyX,enemyY).id
        var killIndex = pieces.findIndex((el) => el.id === pieceId)
        updatedPieces.splice(killIndex,1)
        
        return updatedPieces
    }

    checkPieceLocations = (x,y) => {
        const { pieces } = this.state
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                return pieces[key]
            }
        }
    }

    switchPlayer = (input) => {
        switch (input) {
            case 'good':
                this.setState({currentPlayer:'bad'})
                break;
            case 'bad':
                this.setState({currentPlayer:'good'})
        }
    }

    selectTile = (x,y,piece) => {
        // const {matrix} = this.state
        // const updateMatrix = [...matrix]
        // updateMatrix[x][y] = piece
        // console.log('hit select tile',updateMatrix[0])
        // this.setState({activeLocation:updateMatrix[x][y]})
        
        const getContents = (piece) => {
            if(piece[0] != undefined) {
                // console.log(piece[0].x,piece[0].y,piece,'here is x in select tile')
                // this.setMoves(piece[0].x,piece[0].y,piece[0].id)
                return piece[0]}
        }
        this.handleInput('activeLocation',[x,y,.2,getContents(piece)])
        this.handleInput('tileIsSelected',.4)
    }
    
    unselectTile = () => {
        this.handleInput('tileIsSelected',1)
        this.handleInput('activeLocation',[null,null])
    }

    // makeMove = (x,y,id) => {
    //     const { pieces } = this.state
    //     var updatePieces = [...pieces]

    // }

    handleInput = (prop,val) => {
        this.setState({[prop]:val})
    }
    // selectPiece = (input) => {
        // console.log('hit select piece')
        // this.setState(prevState => {
        //     // let 
        //     selectedPiece:input})
    // }

    render() {

        const { matrix,pieces,activeLocation,currentPlayer,tileIsSelected } = this.state

        const mappedMatrix = matrix.map((el,id) => {
            return el.map((el2,id2) => {
                const currentPiece = pieces.filter(e => e.x === id2 && e.y === id)
                return <Tile key={[id2,id]} x={id2} y={id} color={(-1)**(id+id2)} selectTile={this.selectTile} unselectTile={this.unselectTile} setMoves={this.setMoves} currentPiece={currentPiece} currentPlayer={currentPlayer} activeLocation={activeLocation} tileIsSelected={tileIsSelected} />
            })
        })

        // const mappedPieces = pieces.map(el => {
        //     // console.log(pieces)
        //     const currenPiece = pieces.filter(e => {e.x === el})
        //     return <Tile key={el.id} />
        // })

        // const mappedData = data.map(el => {
        //     return <Tile changeTitle={this.changeTitle} selectPiece={this.selectPiece} key={el.id} el={el}/>
        // })


        // const mappedBoard = board.map(el => {
        //     return <Tile el={el}/>
        // })

        return(<div className='checker-table'>
            {/* {console.log('here is board',this.state.matrix)} */}
            {/* {this.state.matrix.forEach(el => console.log(el[0]))} */}
            {/* <div className='data-spec' >  */}

            {/* <span className='check-row-1' >{mappedBoard}</span> */}
            {/* <Tile /> */}
            {/* <Piece /> */}
            {/* <span className='check-row-1' >{mappedMoves}</span> */}
            <span className='check-row-1' >{mappedMatrix}</span>
            
            {/* <span className='check-row-1' >
                <div className='scrollitems'>{board[0][0]}</div>
                <div className='scrollitems'>{board[0][1]}</div>   
                <div className='scrollitems'></div> 
                <div className='scrollitems'></div>
                <div className='scrollitems'></div>   
                <div className='scrollitems'></div> 
                <div className='scrollitems'></div>
                <div className='scrollitems'></div>  
            </span>  */}

            {/* <span className='check-row-2' >
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>  
            </span>  */}

            {/* <span className='check-row-2' >
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>  
            </span>  */}
            
            

        </div>)
    }
}

export default CheckerBoard