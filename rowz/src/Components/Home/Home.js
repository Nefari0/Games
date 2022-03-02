import './Home.css'
import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket(`ws://127.0.0.1:8000`); // production
// const client = new W3CWebSocket(`ws://165.227.102.189:8000`); // build

class Home extends Component {
    constructor() {
        super()

        this.state ={
            newMessages:[]
        }
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
                console.log('got reply',dataFromServer)
                if (dataFromServer.type === 'message' ) {
                this.setState((State) =>
                ({newMessages:[...this.state.newMessages,
                {
                    msg: dataFromServer.msg,
                    user:dataFromServer.user
                }]
        
                }))
                // console.log('is messaged')
                }
                }
            }
    
        sendToSockets = (input) => {
            // const { messages,loggedInUser } = this.state
            // const { user } = this.props.user.user
            // client.send(JSON.stringify({type: "message",msg:text,user:user, conversation_id:conversation_id}))
            client.send(JSON.stringify({type: "message",input}))
        };

    render() {

        return(
            <div className='game-container'>
                <p>home</p>
                <div className='test-button' onClick={() => this.sendToSockets('this is input')} ></div>
            </div>
        )
    }
}

export default Home