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
            currentPlayer:'X',
            // data:null,
        }
        this.makeMove = this.makeMove.bind(this)
        this.isSolved = this.isSolved.bind(this)
    }

        componentDidMount() {
            this.getConnected()
            // axios.get('/api/board/get').then(res => {
            //     this.setState({...this.state,board:res.data})
            // })
        }

        getConnected = (input) => {
            client.onopen = () => {
                console.log('client connected')
            }
            client.onmessage = (message) => {
            
                const dataFromServer = JSON.parse(message.data);
                console.log('got reply',dataFromServer)
                const { board,currentPlayer } = dataFromServer.input
                if (dataFromServer.type === 'newTurn' ) {
                // this.setState((State) =>
                // ({newMessages:[...this.state.newMessages,
                // {
                //     msg: dataFromServer.msg,
                //     user:dataFromServer.user
                // }]
        
                // }))
                this.setState({
                    board:board,
                    currentPlayer:currentPlayer
                })
                }
                }
            }
    
        sendToSockets = (input) => {
            // const { messages,loggedInUser } = this.state
            // const { user } = this.props.user.user
            // client.send(JSON.stringify({type: "message",msg:text,user:user, conversation_id:conversation_id}))
            client.send(JSON.stringify({type: "message",input}))
        };

        sendToSocketsSwitch = (input) => {
            // const { messages,loggedInUser } = this.state
            // const { user } = this.props.user.user
            // client.send(JSON.stringify({type: "message",msg:text,user:user, conversation_id:conversation_id}))
            client.send(JSON.stringify({type: "newTurn",input}))
        };

        sendToSockets2 = (input) => {
            // const { messages,loggedInUser } = this.state
            // const { user } = this.props.user.user
            // client.send(JSON.stringify({type: "message",msg:text,user:user, conversation_id:conversation_id}))
            client.send(JSON.stringify({type: "information",input}))
        };

        pickedPlayerX = () => {

        }

        pickedPlayerO = () => {

        }

        isSolved = (board) => {
            const { currentPlayer } = this.state
            var horizontalWinner = null
            var diagonalWinner = null
            var verticalWinner = null
            var inComplete = -1
            // check horrizontal
            for (let i = 0; i < board.length; i++){
                for (let j = 0; j < board.length; j++){
                    //   console.log('here is i',j,board[j])
                    var isSame = board[i].filter(element => element === "X")
                    console.log('winner',isSame)
                    if (isSame.length === 3){
                        if (isSame[0] > 0){console.log(isSame[0])} else {console.log(-1)}
                    } else {horizontalWinner = false}
                }
            }

            // check diagonal
            //   if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            //     if(board[0][0] > 0) {return(board[0][0])} else {return(-1)}
            // }
            //   if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            //     if(board[2][0] > 0) {return(board[0][2])} else {return(-1)}
            // } else {diagonalWinner = false}
            
            // check vertical
            // for (let i = 0; i < board.length; i++){
            //   if (board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            //     return(board[0][i])
            //     } else {verticalWinner = false}
            // }
            // check board for completion
            // for (let i = 0; i < board.length; i++){
            //   if(board[i].includes(0) != false) {return (-1)}
            // }
            // verify draw
            // if (horizontalWinner === false && verticalWinner === false && diagonalWinner === false){
            //   return(0)
            // }
          }

        makeMove = (row,col) => {
            const { board,currentPlayer } = this.state
            let updateBoard = [...board]
            let player = null
            if (board[row][col] === null ) {updateBoard[row][col] = currentPlayer}
            if (currentPlayer === "X") {player = "O"} else {player = "X"}
            console.log(updateBoard)
            // const isWinner = this.isSolved(updateBoard)
            this.setState({
                board:updateBoard,
                currentPlayer:player
            })
            this.sendToSocketsSwitch(this.state)
            

            // console.log('here is the clone',updateBoard)
        }

    render() {

        const { row1,currentPlayer } = this.state

        // const mappedRow1 = row1.map(el => {
        //     return <div className='rows' key={el.id} ></div>
        // })

        return(
            <div className='home-container'>
                <div className='columns'>

                    {/* {mappedBoard} */}
                    {/* <p>home</p> */}
                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(0,0)} >{this.state.board[0][0]}</div>
                        <div className='tile' onClick={() => this.makeMove(0,1)} >{this.state.board[0][1]}</div>
                        <div className='tile' onClick={() => this.makeMove(0,2)} >{this.state.board[0][2]}</div>
                    </div>

                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(1,0)} >{this.state.board[1][0]}</div>
                        <div className='tile' onClick={() => this.makeMove(1,1)} >{this.state.board[1][1]}</div>
                        <div className='tile' onClick={() => this.makeMove(1,2)} >{this.state.board[1][2]}</div>
                    </div>

                    <div className='rows'>
                        <div className='tile' onClick={() => this.makeMove(2,0)} >{this.state.board[2][0]}</div>
                        <div className='tile' onClick={() => this.makeMove(2,1)} >{this.state.board[2][1]}</div>
                        <div className='tile' onClick={() => this.makeMove(2,2)} >{this.state.board[2][2]}</div>
                    </div>

                    {/* <div className='rows'>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                    </div> */}

                    {/* <div className='rows'>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                        <div className='tile' onClick={() => this.sendToSockets('this is input')} ></div>
                    </div> */}
                    
                </div>
                {/* <div className='player-row'>
                    <div className='player-seat'><h1>O</h1></div>
                    <div className='player-seat'><h1>X</h1></div>
                </div> */}
            </div>
        )
    }
}

export default Home