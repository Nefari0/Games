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
            currentPlayer:'good'
        }
        this.selectTile = this.selectTile.bind(this)
        this.boardFactory = this.boardFactory.bind(this)
        this.getConnected = this.getConnected.bind(this)
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
            this.switchPlayer(currentPlayer)
            // console.log('got reply',currentPlayer)
            if (dataFromServer.type === 'checkerTurn' ) {
            this.setState({
                pieces:dataFromServer.input.newPieces,
                // currentPlayer:currentPlayer
            })
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
        const { pieces,currentPlayer } = this.state
        var updatePieces = [...pieces]
        // console.log('pieces',pieces.findIndex())
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        if(currentPlayer != pieces[pieceIndex].player){
            return
        }

        for (let key in pieces){
            // console.log(pieces[key].x,pieces[key].y,'key')
            if(pieces[key].x === x && pieces[key].y === y){
                
                console.log('here')
                return 'pick another one'
            }
        }


        updatePieces[pieceIndex].x = x
        updatePieces[pieceIndex].y = y
        // updatePieces.y = y+1
        this.setState({
            pieces:updatePieces,
            activeLocation:[null,null]
        })
        var sendInfo = {
            newPieces:this.state.pieces,
            currentPlayer:this.state.currentPlayer
        }
        // this.sendToSocketsSwitch(this.state.pieces)
        this.sendToSocketsSwitch(sendInfo)
        // if (matrix[x][y] === undefined){console.log('you can move here',matrix[x][y] )}
        // console.log(x,y,'down',updatePieces[pieceIndex])
    }

    // getMoves = (currenPieceX,currenPieceY) => {

    // }

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
        this.handleInput('activeLocation',[x,y,getContents(piece)])
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

        const { matrix,pieces,activeLocation } = this.state

        const mappedMatrix = matrix.map((el,id) => {
            return el.map((el2,id2) => {
                const currentPiece = pieces.filter(e => e.x === id2 && e.y === id)
                return <Tile key={[id2,id]} x={id2} y={id} color={(-1)**(id+id2)} selectTile={this.selectTile} setMoves={this.setMoves} currentPiece={currentPiece} activeLocation={activeLocation} />
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