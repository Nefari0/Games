// current turn moves
var availableMoves = []

// next turn moves
const adjascentMoves = []
const attackMoves = []
var availableAttacks = []

export const AI = async (board,checkPieceLocations,setMoves) => {
    var moves = []
    await board.forEach(e => {
        if (e.player === 'bad')
        moves.push(initialMoves(e.x,e.y,board,checkPieceLocations,1))
    });
    // console.log(moves)
}



const getCoords = (counter) => {
    const moves = [
        [counter,counter],
        [-counter,counter],
        [-counter,-counter],
        [counter,-counter],
    ]

    return(moves)
}

export const initialMoves = (x,y,currentBoard,checkPieceLocations) => {
    const moves = getCoords(3)
    const nextMoves = []
    const generatedMoves = []
    const occupied = []

    
    // find available spots
    for (let move in moves) {
        // console.log(moves[move][0])
        nextMoves.push([x+moves[move][0],y+moves[move][1]])
    }

    // search for adjascent pieces
    for (let nextMove in nextMoves) {
        var nextPiece = checkPieceLocations(nextMoves[nextMove][0],nextMoves[nextMove][1],currentBoard)
        // console.log(nextPiece)
        if (nextPiece === undefined) {
            var move = {
                x:nextMoves[nextMove][0],
                y:nextMoves[nextMove][1],
                score:2
            }
            generatedMoves.push(move)
        } else {console.log(nextPiece)}
    }

    adjascentMoves.push(generatedMoves)
   
    const options = {
        adjascentMoves:adjascentMoves,
        attackMoves:attackMoves
    }

    return options
};

const getAttackmoves = () => {
    var nextMove = []
    // const moves = getCoords(2)
    // console.log(moves) 
    // for (let move in moves) {
    //     // console.log(moves[move])
    //     // nextMoves.push([x+moves[move][0],y+moves[move][1]])
    // }

}




// export const aiMoves = async (x,y,currentPiece,setState,killPiece) => { // gets all move options based on active location
//         // console.log('READY STATE',client.readyState)
//         const { matrix,pieces,currentPlayer } = this.state
//         const { isKing,id } = currentPiece[0]
//         var pieceIndex = pieces.findIndex((el) => el.id === id)
//         this.setState({
//             chainKillAvailable:false,
//             previousPiece:null,
//             moveOptions:null
//         })

//         if (client.readyState != client.OPEN) {    
//             return (this.getConnected())
//         }

//         if(currentPlayer !== pieces[pieceIndex].player){
//             return
//         }

//         // --- this checks all pieces on board for available locations/moves --- //
//         for (let key in pieces){
//             if(pieces[key].x === x && pieces[key].y === y){
//                 if(pieces[key].player !== currentPlayer){
                    
//                     // if the chosen move already contains a piece, check if friend or foe
//                     const attackCoordinates = await attackLogic(pieces[key].x,pieces[key].y,currentPiece,this.state,this.checkPieceLocations)
//                     if (!attackCoordinates) {return this.props.updateNotice('This move is not allowed')}
//                     const { nextX,nextY,enemyX,enemyY,id } = attackCoordinates

//                     // --- Make attack --- //
//                     const updatedPieces = await this.killPiece(enemyX,enemyY)
//                     pieceIndex = updatedPieces.findIndex((el) => el.id === id)
//                     updatedPieces[pieceIndex].x = nextX
//                     updatedPieces[pieceIndex].y = nextY

//                     // -- piece becomes king if "good" AND at max-y location -- //
//                     if (updatedPieces[pieceIndex].player === 'good' && updatedPieces[pieceIndex].y === matrix.length-1) {
//                         updatedPieces[pieceIndex].isKing = true
//                     }

//                     // -- piece becomes king if "bad" AND at min-y location -- //
//                     if(updatedPieces[pieceIndex].player === 'bad' && updatedPieces[pieceIndex].y === 0 ){
//                         updatedPieces[pieceIndex].isKing = true
//                     }
    
//                     // -- make chain attack if available -- //
//                     this.chainKills(updatedPieces,updatedPieces[pieceIndex],true)
//                     var sendInfo = {
//                         newPieces:updatedPieces,
//                         currentPlayer:this.state.currentPlayer,
//                         previousPiece:updatedPieces[pieceIndex]
//                     }
//                     this.sendToSocketsSwitch(sendInfo)
//                     return 
//                     } else {return}
//             }
//         }
//         return await this.executeMovePiece(x,y,id,currentPlayer,isKing) 
//     }