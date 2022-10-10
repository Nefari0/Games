import './tictactoe.styles.css'
import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket(`ws://127.0.0.1:8000`); // production
const client = new W3CWebSocket(`ws://165.227.102.189:8000`); // build

class TicTacToe extends Component {
    constructor() {
        super()

        this.state ={
            board:[
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ],
            currentPlayer:"X",
        }
        this.makeMove = this.makeMove.bind(this)
        this.flipBoard = this.flipBoard.bind(this)
        this.getConnected = this.getConnected.bind(this)
    }

        componentDidMount() {
            this.getConnected()
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
                if (dataFromServer.type === 'newTurn' ) {
                this.setState({
                    board:board,
                })
                }
                }
            }

        sendToSocketsSwitch = (input) => {
            client.send(JSON.stringify({type: "newTurn",input}))
        };

        isSolved = (board,currentPlayer) => {
            var horizontalWinner = null
            var diagonalWinner = null
            var verticalWinner = null
            // var inComplete = -1
            for (let i = 0; i < board.length; i++){
                for (let j = 0; j < board.length; j++){
                    var isSame = board[i].filter(element => element === currentPlayer)
                    if (isSame.length === 3){
                        if (isSame[0][0] === currentPlayer){this.setState({horizontalWinner:currentPlayer})} else {console.log(-1)}
                    } else {horizontalWinner = false}
                }
            }

            // check diagonal
              if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
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
            if (board[row][col] === null ) {updateBoard[row][col] = currentPlayer}
            this.setState({
                board:updateBoard,
                currentPlayer:player
            })
            this.sendToSocketsSwitch(this.state)
            
        }

        handleInput = (prop,val) => {
            this.setState({[prop]:val})
        }

        flipBoard = () => {
            // this.setState({
            //     board:[
            //         [null,null,null],
            //         [null,null,null],
            //         [null,null,null]
            //     ],
            //     currentPlayer:"X",
            // })

            const newBoard = {
                board:[
                    [null,null,null],
                    [null,null,null],
                    [null,null,null]
                ],
                currentPlayer:"X",
            }
            this.sendToSocketsSwitch(newBoard)
        }

    render() {

        const { board } = this.state


        return(
            <div className='home-container'>
                <div className='columns'>

                    <div className='rows'>
                        <div className={`tile ${board[0][0] ? null : 'tile-selected'}`} onClick={() => this.makeMove(0,0)} ><h1 className='selected-h1'>{this.state.board[0][0]}</h1></div>
                        <div className={`tile ${board[0][1] ? null : 'tile-selected'}`} onClick={() => this.makeMove(0,1)} ><h1 className='selected-h1'>{this.state.board[0][1]}</h1></div>
                        <div className={`tile ${board[0][2] ? null : 'tile-selected'}`} onClick={() => this.makeMove(0,2)} ><h1 className='selected-h1'>{this.state.board[0][2]}</h1></div>
                    </div>

                    <div className='rows'>
                        <div className={`tile ${board[1][0] ? null : 'tile-selected'}`} onClick={() => this.makeMove(1,0)} ><h1 className='selected-h1'>{this.state.board[1][0]}</h1></div>
                        <div className={`tile ${board[1][1] ? null : 'tile-selected'}`} onClick={() => this.makeMove(1,1)} ><h1 className='selected-h1'>{this.state.board[1][1]}</h1></div>
                        <div className={`tile ${board[1][2] ? null : 'tile-selected'}`} onClick={() => this.makeMove(1,2)} ><h1 className='selected-h1'>{this.state.board[1][2]}</h1></div>
                    </div>

                    <div className='rows'>
                        <div className={`tile ${board[2][0] ? null : 'tile-selected'}`} onClick={() => this.makeMove(2,0)} ><h1 className='selected-h1'>{this.state.board[2][0]}</h1></div>
                        <div className={`tile ${board[2][1] ? null : 'tile-selected'}`} onClick={() => this.makeMove(2,1)} ><h1 className='selected-h1'>{this.state.board[2][1]}</h1></div>
                        <div className={`tile ${board[2][2] ? null : 'tile-selected'}`} onClick={() => this.makeMove(2,2)} ><h1 className='selected-h1'>{this.state.board[2][2]}</h1></div>
                    </div>
                    <div className='reset-button' onClick={() => this.flipBoard()} ><h1 className='selected-h1'>reset</h1></div>
                    
                </div>

            </div>
        )
    }
}

export default TicTacToe