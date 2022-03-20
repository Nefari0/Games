// import { PieceFactory } from './Factory'
import './CheckerBoard.css'
import React, { Component } from 'react'
import Tile from './Tile'
import data from '.././data'
import pieces from '.././pieces'
import Piece from './Piece'
import CurrentPlayer from './CurrentPlayer'
// import Notice from '../Notice/Notice'
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
            currentPlayer:'good',
            tileIsSelected:1,
            wasKillMade:false,
            chainKillData:{},
            chainKillAvailable:false
        }
        this.selectTile = this.selectTile.bind(this)
        this.boardFactory = this.boardFactory.bind(this)
        this.getConnected = this.getConnected.bind(this)
        this.checkForKill = this.checkForKill.bind(this)
        this.sendToSocketsSwitch = this.sendToSocketsSwitch.bind(this)
        this.chainKills = this.chainKills.bind(this)
        this.setMoves = this.setMoves.bind(this)
        this.executeMovePiece = this.executeMovePiece.bind(this)
        this.killPiece = this.killPiece.bind(this)
        this.checkPieceLocations = this.checkPieceLocations.bind(this)
        this.switchPlayer = this.switchPlayer.bind(this)
        this.selectTile = this.selectTile.bind(this)
        this.unselectTile = this.unselectTile.bind(this)
        this.handleInput = this.handleInput.bind(this)

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

    // componentDidUpdate(prevProps,prevState) {
    //     // console.log('whats before update ?',prevState.chainKillAvailable)
    //     if(prevState.chainKillAvailable === true && this.state.chainKillAvailable === false){
    //         this.setState({chainKillAvailable:true})
    //     }
    // }

    getConnected = (input) => {
        // console.log('connect with chain kill 1',this.state.chainKillAvailable)
        client.onopen = () => {
            console.log('client connected')
        }
        client.onmessage = (message) => {
        
            const dataFromServer = JSON.parse(message.data);
            const { board,currentPlayer,pieces } = dataFromServer.input
            // console.log('jump available',this.state.chainKillAvailable)
            // if(this.state.chainKillAvailable === true){
            //     if(this.state.chainKillData != undefined){
            //         const { x,y,player,isKing } = this.state.chainKillData[0]
            //         var obj = {
            //             player:player,
            //             isKing:isKing
            //         }
            //         this.selectTile(x,y,[obj])
            //         this.checkForKill(this.state.nextX,this.state.nextY)
            //         this.setState({chainKillAvailable:false})
            //     }
            // }
            // this.isSolved(board,currentPlayer)
            // console.log('got reply',dataFromServer.input.chainKillData)
            if (dataFromServer.type === 'checkerTurn' ) {
                this.setState({
                    pieces:dataFromServer.input.newPieces,
                    chainKillData:dataFromServer.input.chainKillData,
                    // currentPlayer:currentPlayer
                })
                // this.autoStartTurn() // for testing / pending removal
                this.switchPlayer(currentPlayer)
                if(this.state.chainKillAvailable === true){
                    if(this.state.chainKillData != undefined){
                        const { x,y,player,isKing } = this.state.chainKillData[0]
                        // var obj = {
                        //     player:player,
                        //     isKing:isKing
                        // }
                        // this.selectTile(x,y,[obj])
                        this.checkForKill(this.state.enemyX,this.state.enemyY,this.state.chainKillData)
                        this.setState({chainKillAvailable:false})
                    }
                }
                // if(this.state.chainKillAvailable === true){
                //     console.log('there is a kill available')
                // }
                // if(this.state.chainKillData != undefined){
                //     const { x,y,player,isKing } = this.state.chainKillData[0]
                //     var obj = {
                //         player:player,
                //         isKing:isKing
                //     }
                //     // this.selectTile(x,y,[obj])
                // }
                
                
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
    autoStartTurn = async (currentPlayer,pieceLocation,pieces) => {
        console.log('turn of auto start turn in set moves to remove errors')
        const { activeLocation } = this.state
        // var updatedPieces = [...pieces]
        var currentPieces = pieces.filter((el) => el.player === currentPlayer)
        // var enemyPieces = pieces.filter((el) => el.player != currentPlayer)
        const { x,y,id,player,isKing } = pieceLocation
        console.log(' here is x',activeLocation)
        const upLeft = [x-1,y-1]
        const upRight = [x+1,y-1]
        const downLeft = [x-1,y+1]
        const downRight = [x+1,y+1]
        const moves = [upLeft,upRight,downLeft,downRight]

        moves.forEach(el => {
            console.log('hit the moves')
            this.setMoves(el[0],el[1],id,activeLocation,false,player,pieces,isKing)
            // setMoves = async (x,y,id,activeLocation,manualControl,currentPlayer,pieces,isKing) => {
                // await this.checkForKill(pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id,activeLocation[3])
        })

        // for (let key1 in currentPieces ){
            // console.log(currentPieces[key1])
            // <div className={`low-right`} onClick={() => props.setMoves(x+1,y+1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'))} ></div>
            // <div className='low-left' onClick={() => props.setMoves(x-1,y+1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'))}></div>
            // <div className='top-left' onClick={() => props.setMoves(x-1,y-1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'))}></div>
            // <div className='top-right' onClick={() => props.setMoves(x+1,y-1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'))}></div>
            
        // }
    }

    // checks for chain kills
    chainKills = async (x,y,updatedPieces,currentPiece) => {
        const { matrix } = this.state
        const { player } = currentPiece[0]
        // console.log('checking equalities',updatedPieces[0].x,currentPiece[0].x)
        // console.log('hit chainKills update',updatedPieces)
        // const upLeft = [x-1,y-1]
        // const upRight = [x+1,y-1]
        // const downLeft = [x-1,y+1]
        // const downRight = [x+1,y+1]
        const upLeft = [-1,-1]
        const upRight = [1,-1]
        const downLeft = [-1,1]
        const downRight = [1,1]
        const moves = [upLeft,upRight,downLeft,downRight]
        moves.forEach(e => {
            var locatePiece = this.checkPieceLocations(x+e[0],y+e[1],updatedPieces)
            
            // --- check for adjacent pieces / is piece friend of foe? --- //
            // if(this.checkPieceLocations(e[0],e[1],updatedPieces) !== undefined && this.checkPieceLocations(e[0],e[1],updatedPieces).player !== player){
            if(locatePiece !== undefined && locatePiece.player !== player){
                // console.log('locate piece',locatePiece.x,locatePiece.y)
                
                // --- if it is a foe, is the next location over available? --- //
                // console.log('e.vals',parseInt(e[0]),parseInt(e[1]))
                // console.log('locatePiece.',locatePiece.x,locatePiece.y)
                var nextX = parseInt(e[0]) + locatePiece.x // potential jump to x
                var nextY = parseInt(e[1]) + locatePiece.y // potential jump to y
                var availMove = this.checkPieceLocations(nextX,nextY,updatedPieces) // are available "jump to" coordinates available
                // console.log('nextVals',nextX,nextY)
                if(availMove === undefined) {
                    
                    // -- is location on the board -- //
                    if(nextX >= 0 && nextX <= matrix.length){
                        if(nextY >= 0 && nextY <= matrix.length) {

                            // --- can move be made if isKing === false ? --- //
                            // --- "good" non-kings
                            if(player === "good" && nextY < currentPiece[0].y){
                                if(currentPiece[0].isKing === false){return}
                            }
                            
                            // --- "bad" non-kings
                            if(player === "bad" && nextY > currentPiece[0].y){
                                if(currentPiece[0].isKing === false){return}
                            }

                            // --- send location / piece to sockets to ensure only the current piece and available move can be taken after socket update --- //
                            // var obj = {
                            //     nextX:nextX,
                            //     nextY:nextY,
                            //     updatedPieces
                            // }
                            console.log('current',currentPiece[0].x,currentPiece[0].y)
                            this.setState({
                                chainKillData:currentPiece,
                                // chainKillData:updatedPieces,
                                enemyX:locatePiece.x,
                                enemyY:locatePiece.y,
                                // chainKillData:obj,
                                chainKillAvailable:true
                            })
            
                            
                            this.switchPlayer(player)
                            return
                        }
                    }
                    
                }
                


                
                // selectTile = (x,y,piece) => {
                    // console.log('chain kill data 1',this.state.chainKillData)
                    // this.selectTile(x,y,currentPiece)
                    // console.log('chain kill data 2',this.state.chainKillData)
            } 
            return
        })
    }

    setMoves = async (x,y,id,activeLocation,manualControl,currentPlayer,pieces,isKing,currentPiece) => { // gets all move options based on active location
        // const { matrix } = this.state
        // console.log('current player',currentPiece)
        var updatePieces = [...pieces]
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        if(currentPlayer != pieces[pieceIndex].player){
            // console.log(`currentPlayer != pieces[pieceIndex].player - ${currentPlayer}`)
            return
        }

        // this checks all pieces on board for available locations/moves
        for (let key in pieces){
            if(pieces[key].x === x && pieces[key].y === y){
                if(pieces[key].player != currentPlayer){
                    // console.log('pi',activeLocation)
                    var res = [pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id]
                    // console.log('active location team',activeLocation[3])
                    return (
                        // if the chosen move already contains a piece, check if friend or foe
                        // res
                        // await this.checkForKill(pieces[key].x,pieces[key].y,activeLocation[0],activeLocation[1],id,activeLocation[3],currentPiece)
                        await this.checkForKill(pieces[key].x,pieces[key].y,currentPiece)
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

    // -- looks for and executes available attacks -- //
    // checkForKill = async (enemyX,enemyY,currentX,currentY,id,activeLocationTeam,currentPiece) => {
        checkForKill = async (enemyX,enemyY,currentPiece) => {
        // console.log('check for kill func',enemyX,enemyY)
        const { pieces,currentPlayer,activeLocation,matrix } = this.state
        // const { player,isKing } = activeLocationTeam
        const { player,isKing,id,x,y } = currentPiece[0]
        var currentX = x
        var currentY = y
        // console.log('is king and player',isKing,player)
        var pieceIndex = pieces.findIndex((el) => el.id === id)

        // -- LOWER LEFT ATTACK -- //
        if(currentX > enemyX && currentY < enemyY){
            // console.log('hit "checkForKill_1')

            // -- non-kings can only attack one direction on the y-axis -- //
            if(player === 'bad' && isKing === false){return}

            // -- check if location is available -- //
            if(await this.checkPieceLocations(enemyX-1,enemyY+1,null) === undefined) {

                // -- is location on the board? -- //
                if(enemyX-1 >= 0 && enemyY+1 <= matrix.length-1){

                    // -- update pieces -- //
                    var updatePieces = await this.killPiece(enemyX,enemyY,id)
                    var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                    updatePieces[pieceIndex].x = enemyX-1
                    updatePieces[pieceIndex].y = enemyY+1

                    // -- piece becomes king if "good" AND at max-y location -- //
                    if (updatePieces[pieceIndex].player === 'good' && updatePieces[pieceIndex].y === matrix.length-1) {
                        updatePieces[pieceIndex].isKing = true
                    }

                    // -- make chain attack if available -- //
                    // this.chainKills(updatePieces[pieceIndex].x,updatePieces[pieceIndex].y,currentPlayer,updatePieces,currentPiece)
                    this.chainKills(updatePieces[pieceIndex].x,updatePieces[pieceIndex].y,updatePieces,currentPiece)
                    currentPiece[0].x = updatePieces[pieceIndex].x
                    currentPiece[0].y = updatePieces[pieceIndex].y

                    // -- update info -- //
                    this.setState({
                        pieces:updatePieces,
                        activeLocation:[null,null],
                        tileIsSelected:1,
                    })
    
                    // -- info sent to server -- //
                    var sendInfo = {
                        chainKillData:this.state.chainKillData,
                        newPieces:updatePieces,
                        currentPlayer:this.state.currentPlayer
                    }
                    // -- sends updates to server -- //
                    return await this.sendToSocketsSwitch(sendInfo)
                    // return this.executeMovePiece = (x,y,id)
                }
            }

        // -- UPPER LEFT ATTACK -- //
        } else if (currentX > enemyX && currentY > enemyY) {
            // console.log('hit "checkForKill_2')
            // console.log('hit upper left')
            // -- non-kings can only attack one direction on the y-axis -- //
            if(player === 'good' && isKing === false){return}

            // -- check if location is available -- //
            if( await this.checkPieceLocations(enemyX-1,enemyY-1,null) === undefined) {

                // -- is location on the board? -- //
                if(enemyX-1 >= 0 && enemyY-1 >= 0) {

                    // -- update piece -- //
                    var updatePieces = await this.killPiece(enemyX,enemyY,id)
                    var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                    updatePieces[pieceIndex].x = enemyX-1
                    updatePieces[pieceIndex].y = enemyY-1

                    // -- piece becomes king if "bad" AND at min-y location -- //
                    if(updatePieces[pieceIndex].player === 'bad' && updatePieces[pieceIndex].y === 0 ){
                        updatePieces[pieceIndex].isKing = true
                    }

                    // -- make chain attack if available -- //
                    this.chainKills(updatePieces[pieceIndex].x,updatePieces[pieceIndex].y,updatePieces,currentPiece)
                    currentPiece[0].x = updatePieces[pieceIndex].x
                    currentPiece[0].y = updatePieces[pieceIndex].y
                    
                    // -- update info -- //
                    this.setState({
                        pieces:updatePieces,
                        activeLocation:[null,null],
                        tileIsSelected:1
                    })

                    // -- info sent to server -- //
                    var sendInfo = {
                        chainKillData:this.state.chainKillData,
                        newPieces:updatePieces,
                        currentPlayer:this.state.currentPlayer
                    }
                    // -- send updates to server -- //
                    return await this.sendToSocketsSwitch(sendInfo)
                }
                
            }

        // -- UPPER RIGHT ATTACK -- /
        } else if (currentX < enemyX && currentY > enemyY) {
            // console.log('hit "checkForKill_3',currentX,currentY,enemyX,enemyY)
            // console.log('hit upper right')

            // -- non-kings can only attack one direction on the y-axis -- //
            if(player === 'good' && isKing === false){return}

            // -- check if location is available -- //
            if(await this.checkPieceLocations(enemyX+1,enemyY-1,null) === undefined) {
                
                // -- is location on the board? -- //
                if(enemyX+1 <= matrix.length-1 && enemyY-1 >= 0){

                    // -- update pieces -- //
                    var updatePieces = await this.killPiece(enemyX,enemyY,id)
                    var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                    updatePieces[pieceIndex].x = enemyX+1
                    updatePieces[pieceIndex].y = enemyY-1

                    // -- piece becomes king if "bad" AND at min-y location -- //
                    if(updatePieces[pieceIndex].player === 'bad' && updatePieces[pieceIndex].y === 0 ){
                        updatePieces[pieceIndex].isKing = true
                    }
                    // await this.autoStartTurn(currentPlayer,updatePieces[pieceIndex],activeLocation,updatePieces)

                    // -- make chain attack if available -- //
                    this.chainKills(updatePieces[pieceIndex].x,updatePieces[pieceIndex].y,updatePieces,currentPiece)
                    currentPiece[0].x = updatePieces[pieceIndex].x
                    currentPiece[0].y = updatePieces[pieceIndex].y

                    // -- update info -- //
                    this.setState({
                        // pieces:updatePieces,
                        activeLocation:[null,null],
                        tileIsSelected:1
                    })

                    //  -- info sent to server -- //
                    var sendInfo = {
                        chainKillData:this.state.chainKillData,
                        newPieces:updatePieces,
                        currentPlayer:this.state.currentPlayer
                    }
                    // -- send info to server -- //
                    return await this.sendToSocketsSwitch(sendInfo)
                }
                
            }

        // -- LOWER RIGHT ATTACK -- //
        } else if (currentX < enemyX && currentY < enemyY) {
            // console.log('hit "checkForKill_4')
            // console.log('hit lower right')

            // -- non-kings can only attack one direction on the y-axis -- //
            if(player === 'bad' && isKing === false){return}
            
            // -- check if location is available -- //
            if(await this.checkPieceLocations(enemyX+1,enemyY+1,null) === undefined) {
                // console.log('location on board?',enemyX+1,enemyY+1)

                // -- is location on the board? -- //
                if(enemyX+1 >= 0 && enemyY+1 <= matrix.length-1) {
                    // console.log('is on board')
                    var updatePieces = await this.killPiece(enemyX,enemyY,id)
                    var pieceIndex = updatePieces.findIndex((el) => el.id === id)
                    updatePieces[pieceIndex].x = enemyX+1
                    updatePieces[pieceIndex].y = enemyY+1
                    if (updatePieces[pieceIndex].player === 'good' && updatePieces[pieceIndex].y === matrix.length-1) {
                        updatePieces[pieceIndex].isKing = true
                    }
                    // await this.autoStartTurn(currentPlayer,updatePieces[pieceIndex],activeLocation,updatePieces)

                    // -- make chain attack if available -- //
                    this.chainKills(updatePieces[pieceIndex].x,updatePieces[pieceIndex].y,updatePieces,currentPiece)
                    // console.log('prev',currentPiece[0].x,currentPiece[0].y)
                    currentPiece[0].x = updatePieces[pieceIndex].x
                    currentPiece[0].y = updatePieces[pieceIndex].y
                    // console.log('next',currentPiece[0].x,currentPiece[0].y)

                    this.setState({
                        // pieces:updatePieces,
                        activeLocation:[null,null],
                        tileIsSelected:1
                    })
                    var sendInfo = {
                        chainKillData:this.state.chainKillData,
                        newPieces:updatePieces,
                        currentPlayer:this.state.currentPlayer
                    }
                    return await this.sendToSocketsSwitch(sendInfo)
                }

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
        // console.log('here is kill pieceOd',pieceId)
        updatedPieces.splice(killIndex,1)
        // console.log('here is kill pieceOd',updatedPieces)
        
        return updatedPieces
    }

    // -- checks location for availability -- //
    checkPieceLocations = (x,y,updatedPieces) => {
        const { pieces } = this.state

        // -- this is for chain kills -- //
        if(updatedPieces != null){
            for (let key in updatedPieces){
                if(updatedPieces[key].x === x && updatedPieces[key].y === y){
                    // console.log('updated pieces have been issued')
                    return updatedPieces[key]
                }
            }
            // -- this is for manual kills -- //
        } else {
            for (let key in pieces){
                if(pieces[key].x === x && pieces[key].y === y){
                    // console.log('pieces are from state')
                    return pieces[key]
                }
            }
        }
        
    }

    switchPlayer = async (input) => {
        // console.log('1 hit switch player',input)
        // console.log('2 hit switch player',this.state.currentPlayer)
        switch (input) {
            case 'good':
                this.setState({currentPlayer:'bad'})
                // this.autoStartTurn(this.state.currentPlayer,pieces) // for testing / pending removal
                break;
            case 'bad':
                this.setState({currentPlayer:'good'})
                // this.autoStartTurn(this.state.currentPlayer,pieces) // for testing / pending removal
        }
        return
        // console.log('3 bottom of switch',this.state.currentPlayer)
    }

    selectTile = (x,y,piece) => {
        // console.log('selesct tile',piece[0])
        // const {matrix} = this.state
        // const updateMatrix = [...matrix]
        // updateMatrix[x][y] = piece
        // this.setState({activeLocation:updateMatrix[x][y]})
        
        // const getContents = (piece) => {
            if(piece[0] != undefined) {
                // console.log('data in selectTile',piece[0])
                // console.log(piece[0].x,piece[0].y,piece,'here is x in select tile')
                // this.setMoves(piece[0].x,piece[0].y,piece[0].id)
                this.handleInput('activeLocation',[x,y,.2,piece])
                this.handleInput('tileIsSelected',.4)
            }
        return
        // }
        // this.handleInput('activeLocation',[x,y,.2,getContents(piece)])
        // this.handleInput('tileIsSelected',.4)
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
        return
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

            {/*  --- test --- */}
            {/* <Notice info={currentPlayer}/>  */}
            {/*  --- test --- */}
           
            
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