import './Home.css'
import React, { Component } from 'react'
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket(`ws://127.0.0.1:8001`); // production
// const client = new W3CWebSocket(`ws://165.227.102.189:8001`); // build

class Home extends Component {
    constructor() {
        super()

        // const initialState = [
            // { id: 1, counter: '' },
            // { id: 2, counter: '' },
            // { id: 3, counter: '' }
        //   ];

        this.state ={
            // state:initialState,
            // board:[],
            board:[
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ],
            currentPlayer:"X",
            playerX:null,
            playerY:null,
            enterTextX:false,
            enterTextY:false,
            // data:null,
        }
        this.makeMove = this.makeMove.bind(this)
        // this.isSolved = this.isSolved.bind(this)
        // this.switchPlayer = this.switchPlayer.bind(this)
        this.getConnected = this.getConnected.bind(this)
    }

        componentDidMount() {
            this.getConnected()
        }

        componentDidUpdate(prevProps,prevState) {
            const { currentPlayer } = prevState
            // console.log('prev props',currentPlayer)
            // if (currentPlayer === "X") {this.setState({currentPlayer:"O"})}
        }

        getConnected = (input) => {
            client.onopen = () => {
                console.log('client connected')
            }
            client.onmessage = (message) => {
            
                const dataFromServer = JSON.parse(message.data);
                const { board,currentPlayer } = dataFromServer.input
                this.isSolved(board,currentPlayer)
                this.switchPlayer(currentPlayer)
                // console.log('got reply',currentPlayer)
                if (dataFromServer.type === 'newTurn' ) {
                this.setState({
                    board:board,
                    // currentPlayer:currentPlayer
                })
                }
                }
            }

        sendToSocketsSwitch = (input) => {
            client.send(JSON.stringify({type: "newTurn",input}))
        };

        isSolved = (board,currentPlayer) => {
            // const { currentPlayer } = this.state
            var horizontalWinner = null
            var diagonalWinner = null
            var verticalWinner = null
            var inComplete = -1
            // check horrizontal
            for (let i = 0; i < board.length; i++){
                for (let j = 0; j < board.length; j++){
                    //   console.log('here is i',j,board[j])
                    var isSame = board[i].filter(element => element === currentPlayer)
                    if (isSame.length === 3){
                        if (isSame[0][0] === currentPlayer){this.setState({horizontalWinner:currentPlayer})} else {console.log(-1)}
                    } else {horizontalWinner = false}
                }
            }
            // this.switchPlayer(currentPlayer)

            // check diagonal
            console.log('winner',board[2][0])
              if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                // if(board[0][0] === currentPlayer) {return(board[0][0])} else {return(-1)}
                if(board[0][0] === currentPlayer) {this.setState({diagonalWinner:currentPlayer})} else {return(-1)}
            }
              if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                if(board[2][0] === currentPlayer) {this.setState({diagonalWinner:currentPlayer})} else {return(-1)}
            } else {diagonalWinner = false}
            
            // check vertical
            for (let i = 0; i < board.length; i++){
              if (board[0][i] === board[1][i] && board[1][i] === board[2][i]){
                this.setState({verticalWinner:currentPlayer})
                } else {verticalWinner = false}
            }
            // check board for completion
            for (let i = 0; i < board.length; i++){
              if(board[i].includes(null) != false) {return (-1)}
            }
            // verify draw
            // if (horizontalWinner === false && verticalWinner === false && diagonalWinner === false){
            //   return(0)
            // }
          }


        //   -----------------------------
        switchPlayer = (input) => {
            switch (input) {
                case 'O':
                    this.setState({currentPlayer:'X'})
                    break;
                case 'X':
                    this.setState({currentPlayer:'O'})
            }
        }

        makeMove = (row,col,player) => {
            const { board,currentPlayer } = this.state
            let updateBoard = [...board]
            // let player = this.switchPlayer(currentPlayer)
            if (board[row][col] === null ) {updateBoard[row][col] = currentPlayer}
            // if (currentPlayer === "X") {player = "O"} else {player = "X"}
            // console.log(player,'here is player')
            // const isWinner = this.isSolved(updateBoard)
            this.setState({
                board:updateBoard,
                currentPlayer:player
            })
            this.sendToSocketsSwitch(this.state)
            

            // console.log('here is the clone',updateBoard)
        }

        handleInput = (prop,val) => {
            this.setState({[prop]:val})
        }
        

        // joinGame = (player,name) => {
        //     const { playerX,playerY } = this.state
        //     if (player === "X" && playerX === null) {
        //         this.setState({[player]:name})
        //     }
        // }

    render() {

        const { row1,currentPlayer,playerX,playerY } = this.state

        // const mappedRow1 = row1.map(el => {
        //     return <div className='rows' key={el.id} ></div>
        // })

        return(
            <div className='home-container'>
                <div className='columns'>

                    {/* {mappedBoard} */}
                    {/* <p>home</p> */}
                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(0,0)} ><h1 className='selected-h1'>{this.state.board[0][0]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(0,1)} ><h1 className='selected-h1'>{this.state.board[0][1]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(0,2)} ><h1 className='selected-h1'>{this.state.board[0][2]}</h1></div>
                    </div>

                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(1,0)} ><h1 className='selected-h1'>{this.state.board[1][0]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(1,1)} ><h1 className='selected-h1'>{this.state.board[1][1]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(1,2)} ><h1 className='selected-h1'>{this.state.board[1][2]}</h1></div>
                    </div>

                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(2,0)} ><h1 className='selected-h1'>{this.state.board[2][0]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(2,1)} ><h1 className='selected-h1'>{this.state.board[2][1]}</h1></div>
                        <div className='tile' onClick={() => this.makeMove(2,2)} ><h1 className='selected-h1'>{this.state.board[2][2]}</h1></div>
                    </div>
                    
                </div>
                {/* <div className='player-row'>
                    <div className='player-seat' ><h1>O</h1></div>
                    <div className='player-seat' ><h1>X</h1></div>
                </div> */}
            </div>
        )
    }
}

export default Home