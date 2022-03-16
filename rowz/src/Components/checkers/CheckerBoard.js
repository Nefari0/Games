// import { PieceFactory } from './Factory'
import './CheckerBoard.css'
import React, { Component } from 'react'
import Tile from './Tile'
import data from '.././data'
import pieces from '.././pieces'
import Piece from './Piece'
import CurrentPlayer from './CurrentPlayer'
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
        this.checkForKill = this.checkForKill.bind(this)
        // this.setMoves = this.setMoves.bind(this)
        // this.autoStartTurn = this.autoStartTurn.bind(this)
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

    // componentDidUpdate() {
    //     this.autoStartTurn()
    // }

    getConnected = (input) => {
        
        client.onopen = () => {
            console.log('client connected')
        }
        client.onmessage = (message) => {
        
            const dataFromServer = JSON.parse(message.data);
            const { board,currentPlayer,pieces } = dataFromServer.input
            // console.log(dataFromServer.input)
            // this.isSolved(board,currentPlayer)
            // console.log('got reply',currentPlayer)
            if (dataFromServer.type === 'checkerTurn' ) {
                this.setState({
                    pieces:dataFromServer.input.newPieces,
                    // currentPlayer:currentPlayer
                })
                // this.autoStartTurn() // for testing / pending removal
                this.switchPlayer(currentPlayer,dataFromServer.input.newPieces)
            }
        }
    }

    sendToSocketsSwitch = (input) => {
        // console.log('hit sockets')
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

    // checks for available attacks of current play at biginning of each turn
    autoStartTurn = async (currentPlayer,pieces) => {
        
        // const { pieces,currentPlayer } = this.state
        // var updatedPieces = [...pieces]
        var currentPieces = pieces.filter((el) => el.player === currentPlayer)
        // var enemyPieces = pieces.filter((el) => el.player != currentPlayer)
        var currentLocations = []
        // currentPieces.forEach(el => {
            // console.log('el',el.id)
            // currentLocations.push([[el.x,el.y],[el.id]])
        // })
        // var locations = [...currentLocations]
        // console.log('currrent',locations)
        for (let key1 in currentPieces ){
            // console.log('hit kills')
            // const tryMoves = [[1,1],[-1,1],[-1,-1],[1,-1]]
            // await tryMoves.forEach(el => {
            //     this.setMoves(currentPieces[key1].x+el[0],currentPieces[key1].y+el[1],currentPieces[key1].id,[currentPieces[key1].x,currentPieces[key1].y],false,currentPlayer,pieces).then((data) => {
            //         // console.log('hit data here',data === undefined)
            //         if(data != undefined){
                        
            //             return this.checkForKill(data[0],data[1],data[2],data[3],data[4])} else {return 'kill not available'}
            //     })
            // })
            const move1 = await this.setMoves(currentPieces[key1].x+1,currentPieces[key1].y+1,currentPieces[key1].id,[currentPieces[key1].x,currentPieces[key1].y],false,currentPlayer,pieces)

            // move2 has a serious glitch that needs to be resolved
            const move2 = await this.setMoves(currentPieces[key1].x-1,currentPieces[key1].y+1,currentPieces[key1].id,[currentPieces[key1].x,currentPieces[key1].y],false,currentPlayer,pieces)

            const move3 = await this.setMoves(currentPieces[key1].x-1,currentPieces[key1].y-1,currentPieces[key1].id,[currentPieces[key1].x,currentPieces[key1].y],false,currentPlayer,pieces)
            
            const move4 = await this.setMoves(currentPieces[key1].x+1,currentPieces[key1].y-1,currentPieces[key1].id,[currentPieces[key1].x,currentPieces[key1].y],false,currentPlayer,pieces)
            if(move1 != undefined){
                console.log(move1,'move 1')
                return this.checkForKill(move1[0],move1[1],move1[2],move1[3],move1[4],move1[5])
            
            } else if (move2 != undefined){
                console.log(move2,'move 2')
                return this.checkForKill(move2[0],move2[1],move2[2],move2[3],move2[4],move2[5])
            } else if (move3 != undefined){
                console.log('move 3')
                return this.checkForKill(move3[0],move3[1],move3[2],move3[3],move3[4],move3[5])
            }
            
        }
    }

    // checks for chain kills
    chainKills = () => {

    }

    setMoves = async (x,y,id,activeLocation,manualControl,currentPlayer,pieces,isKing) => { // gets all move options based on active location
        // const { matrix } = this.state
        // console.log('current player',matrix.length)
        var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        // // --- restricts non king movement --- //
        // // var pieceIndex = pieces.findIndex((el) => el.id === id)
        // if (activeLocation > y && currentPlayer === 'good'){
        //     if(isKing === false){
        //         return console.log('this move is not allowed')
        //     } 
        // }
        // if (activeLocation < y && currentPlayer === 'bad'){
        //     if(isKing === false){
        //         return console.log('this move is not allowed')
        //     } 
        // }

        if(currentPlayer != pieces[pieceIndex].player){
            // console.log(`currentPlayer != pieces[pieceIndex].player - ${currentPlayer}`)
            return
        }

        // this checks all pieces on board for available locations/moves
        // console.log('active location',activeLocation)
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                if(pieces[key].player != currentPlayer){
                    // console.log('pi',activeLocation)
                    var res = [pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id]
                    return (
                        // if the chosen move already contains a piece, check if friend or foe
                        // res
                        // console.log(pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id)
                        await this.checkForKill(pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id,activeLocation[3])
                    )} else {return}
            }
        }
        // this.executeMovePiece(x,y,id)
        if(manualControl === true){return await this.executeMovePiece(x,y,activeLocation[1],id,currentPlayer,isKing)} else {return}

    }

    // makes actual movements
    executeMovePiece = (x,y,activeLocation,id,currentPlayer,isKing) => {
        const { pieces,matrix } = this.state
        var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        if (activeLocation > y && currentPlayer === 'good'){
            if(isKing === false){
                return console.log('this move is not allowed')
            } 
        }
        if (activeLocation < y && currentPlayer === 'bad'){
            if(isKing === false){
                return console.log('this move is not allowed')
            } 
        }
        updatePieces[pieceIndex].x = x
        updatePieces[pieceIndex].y = y
        
        if(updatePieces[pieceIndex].player === 'bad' && updatePieces[pieceIndex].y === 0 ){
            updatePieces[pieceIndex].isKing = true
            // console.log(true)
        } else if (updatePieces[pieceIndex].player === 'good' && updatePieces[pieceIndex].y === matrix.length-1) {
            updatePieces[pieceIndex].isKing = true
        } 

        // const makeKing = this.kingStatus(matrix,updatePieces[pieceIndex])
        // updatePieces[pieceIndex].isKing = makeKing
        // console.log('king status before move',updatePieces)
        // console.log('update',updatePieces[pieceIndex])
        // console.log('update',updatePieces.)
        this.setState({
            pieces:updatePieces,
            activeLocation:[null,null],
            tileIsSelected:1
        })
        var sendInfo = {
            // newPieces:this.state.pieces,
            newPieces:updatePieces,
            currentPlayer:this.state.currentPlayer
        }
        this.sendToSocketsSwitch(sendInfo)
    }
    
    // kingStatus = (mat,piece) => {
    //     console.log('hit kingStatus')
    //     // if(piece.player === 'good' && piece.y === mat.length-1 ){
    //         if(piece.player === 'bad' && piece.y === 0 ){
    //         return true
    //         // console.log(true)
    //     } else if (piece.player === 'good' && piece.y === mat.length-1) {
    //         return true
    //     } else {return false}
    //     // console.log(piece.player)
    //     // console.log(piece.y)
    // }

    // looks for and executes available attacks
    checkForKill = async (enemyX,enemyY,currentX,currentY,id,activeLocationTeam) => {
        const { pieces,currentPlayer,activeLocation } = this.state
        const { player,isKing } = activeLocationTeam
        console.log('king in check for kill',player,isKing)
        // var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        // if(currentX !== undefined && currentY !== undefined){console.log(enemyX,enemyY)}
        // console.log('hit check for kill')
        // console.log('x',currentX,'y',currentY,'current')
        // console.log('x',enemyX,'y',enemyY,'enemy')

        // checks lower left
        if(currentX > enemyX && currentY < enemyY){
            if(player === 'bad' && isKing === false){return}
            if(await this.checkPieceLocations(enemyX-1,enemyY+1) === undefined) {
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                console.log('you hit first')
                var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                updatePieces[pieceIndex].x = enemyX-1
                updatePieces[pieceIndex].y = enemyY+1
                this.setState({
                    // pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1,
                })

                var sendInfo = {
                    newPieces:updatePieces,
                    currentPlayer:this.state.currentPlayer
                }
                return await this.sendToSocketsSwitch(sendInfo)
                // return this.executeMovePiece = (x,y,id)
            }

        // checks upper left
        } else if (currentX > enemyX && currentY > enemyY) {
            if(player === 'good' && isKing === false){return}
            console.log('hit second')
            if( await this.checkPieceLocations(enemyX-1,enemyY-1) === undefined) {
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                updatePieces[pieceIndex].x = enemyX-1
                updatePieces[pieceIndex].y = enemyY-1
                this.setState({
                    // pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1
                })
                var sendInfo = {
                    newPieces:updatePieces,
                    currentPlayer:this.state.currentPlayer
                }
                return await this.sendToSocketsSwitch(sendInfo)
            }

        // checks upper right
        } else if (currentX < enemyX && currentY > enemyY) {
            if(player === 'good' && isKing === false){return}
            if(await this.checkPieceLocations(enemyX+1,enemyY-1) === undefined) {
                console.log('hit third')
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                updatePieces[pieceIndex].x = enemyX+1
                updatePieces[pieceIndex].y = enemyY-1
                this.setState({
                    // pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1
                })
                var sendInfo = {
                    newPieces:updatePieces,
                    currentPlayer:this.state.currentPlayer
                }
                return await this.sendToSocketsSwitch(sendInfo)
            }

        // checks lower right
        } else if (currentX < enemyX && currentY < enemyY) {
            if(player === 'bad' && isKing === false){return}
            console.log('hit fourth')
            if(await this.checkPieceLocations(enemyX+1,enemyY+1) === undefined) {
                var updatePieces = await this.killPiece(enemyX,enemyY,id)
                var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                updatePieces[pieceIndex].x = enemyX+1
                updatePieces[pieceIndex].y = enemyY+1
                this.setState({
                    // pieces:updatePieces,
                    activeLocation:[null,null],
                    tileIsSelected:1
                })
                var sendInfo = {
                    newPieces:updatePieces,
                    currentPlayer:this.state.currentPlayer
                }
                return await this.sendToSocketsSwitch(sendInfo)
            }
        }
    }

    // attacks and removes piece from play
    killPiece = async (enemyX,enemyY,id) => {
        const { pieces } = this.state
        var updatedPieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)
        var pieceId = await this.checkPieceLocations(enemyX,enemyY).id
        // var pieceId = await this.checkPieceLocations(enemyX,enemyY)
        var killIndex = pieces.findIndex((el) => el.id === pieceId)
        console.log('here is kill pieceOd',pieceId)
        updatedPieces.splice(killIndex,1)
        // console.log('here is kill pieceOd',updatedPieces)
        
        return updatedPieces
    }

    // checks location for availability
    checkPieceLocations = (x,y) => {
        const { pieces } = this.state
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                return pieces[key]
            }
        }
    }

    switchPlayer = async (input,pieces) => {
        switch (input) {
            case 'good':
                this.setState({currentPlayer:'bad'})
                // this.autoStartTurn(this.state.currentPlayer,pieces) // for testing / pending removal
                break;
            case 'bad':
                this.setState({currentPlayer:'good'})
                // this.autoStartTurn(this.state.currentPlayer,pieces) // for testing / pending removal
        }
        // console.log('bottom of switch')
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
                return <Tile key={[id2,id]} x={id2} y={id} color={(-1)**(id+id2)} selectTile={this.selectTile} unselectTile={this.unselectTile} setMoves={this.setMoves} currentPiece={currentPiece} currentPlayer={currentPlayer} activeLocation={activeLocation} tileIsSelected={tileIsSelected} pieces={pieces} />
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

        return(<div>
            {/* {console.log('here is board',this.state.matrix)} */}
            {/* {this.state.matrix.forEach(el => console.log(el[0]))} */}
            {/* <div className='data-spec' >  */}

            {/* <span className='check-row-1' >{mappedBoard}</span> */}
            {/* <Tile /> */}
            {/* <Piece /> */}
            {/* <span className='check-row-1' >{mappedMoves}</span> */}
            <div className='checker-table' ><span className='check-row-1' >{mappedMatrix} </span></div>
            <CurrentPlayer currentPlayer={currentPlayer} />
           
            
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