// current turn moves
// var availableMoves = []

// next turn moves
// const adjascentMoves = []
// const attackMoves = []
// var availableAttacks = []

export const AI = (board,checkPieceLocations,setMoves,props) => {
    // console.log('hitting ai',props)
    // current turn moves
    var availableMoves = []

    // next turn moves
    const adjascentMoves = []

    var moves = []
    board.forEach(piece => {
        if (piece.player === 'bad') {
            availableMoves.push(initialMoves(piece,board,checkPieceLocations,setMoves))
        }

        
    });

    // --- AVOID SINGLE ENAMY PIECES --- //
    const evalSingleThreat = findThreats(availableMoves,board,checkPieceLocations)
    // console.log(evalMoves)

    // --- HUNT FOR SINGLE PIECE --- //
    const huntingSingleItem = hunting(evalSingleThreat,board,checkPieceLocations)
    // console.log(huntingSingleItem)
    // --- MOVE BETWEEN TWO PIECES --- //
    // const getNonKings = await nonKingMoves(huntingSingleItem,board,checkPieceLocations)
    // console.log(getNonKings)

    const orderByHighestScore = getHighestScore(huntingSingleItem)

        // remove illegal non-king moves
    // console.log(orderByHighestScore)
    // for (const move in orderByHighestScore) {
    //     const {piece,y} = orderByHighestScore[move]
    //     // console.log(orderByHighestScore[move])
    //     if (piece.y < y && piece.isKing === false) {
    //         orderByHighestScore.pop(move)
    //     }
    // }
    // console.log(orderByHighestScore)


    // orderByHighestScore.forEach(e => {
    //     const { x,y,piece,score } = e
    //     setMoves(x,y,[piece],score)
    // })
    const nonIllegalMoves = orderByHighestScore.filter(e => !(e.piece.y < e.y && e.piece.isKing === false))
    // console.log(orderByHighestScore)
    // console.log(nonIllegalMoves)

    for (const e of nonIllegalMoves) {

    const { x, y, piece, score } = e;
    // if (piece.y > y && piece.isKing === true) {
        // setMoves(x, y, [piece], score);
    // }
    }
    // console.log('HIGHEST SCORE',orderByHighestScore)
}

// --- non-kings cannot move backwards --- //
const removeIllegal = (moves) => {
    // console.log(moves)
    for (const move of moves) {
        if (move.piece.y < move.y) {
            moves.pop(move)
        }
    // console.log(moves)
    return moves
    }
}

const getHighestScore = (allMoves) => {
    // console.log(allMoves)
    return allMoves.flat().sort((a, b) => b.score - a.score)
}

const getCoords = (counter, x = 0, y = 0) => {
    const moves = [
        [x+counter,y+counter],
        [x-counter,y+counter],
        [x-counter,y-counter],
        [x+counter,y-counter],
    ]
    // console.log(moves)

    return(moves)
}

export const initialMoves = (piece,currentBoard,checkPieceLocations,setMoves) => {

    var availableMoves = []

    const { x,y } = piece
    const moves = getCoords(1,x,y)

    // find available spots
    // search for adjascent pieces

    for (let move in moves) {
    // var nextPiece = checkPieceLocations(moves[move][0],moves[move][1],currentBoard)
        var moveObj = {
            piece:piece,
            x:moves[move][0],
            y:moves[move][1],
            score:2
        }
        availableMoves.push(moveObj)
    }
    // console.log(availableMoves)
    // for (let move in moves) {
    //     var nextPiece = checkPieceLocations(moves[move][0],moves[move][1],currentBoard)
    //     if (nextPiece === undefined) {
    //         var moveObj = {
    //             x:moves[move][0],
    //             y:moves[move][1],
    //             score:2
    //         }
    //         generatedMoves.push(moveObj)

    //     } else {return setMoves(nextPiece.x,nextPiece.y,[piece])}
    // }

    // adjascentMoves.push(generatedMoves)
   
    const options = {
        // adjascentMoves:adjascentMoves,
        // attackMoves:attackMoves
    }

    return availableMoves
};

const findThreats = (initialMoves,board,checkPieceLocations) => {
    initialMoves.forEach((moveData) => {
        moveData.forEach((el2) => {
            const nextSteps = getCoords(1, el2.x, el2.y)
            nextSteps.forEach((el3) => {
                const checkCoords = checkPieceLocations(el3[0],el3[1],board)
                if (checkCoords !== undefined) {
                    if (checkCoords.player === 'good') {
                        el2.score-=1
                        console.log('WE SHOULD BE LOSING A POINT',el2.score)
                    }
                }
            })
        })
    })
    return initialMoves
}

const hunting = (moveOptions,board,checkPieceLocations) => {
        // moveOptions.forEach((moveData) => {
        moveOptions.flat().forEach((el2) => {
            const nextSteps = getCoords(2, el2.x, el2.y)
            nextSteps.forEach((el3) => {
                const checkCoords = checkPieceLocations(el3[0],el3[1],board)
                if (checkCoords !== undefined) {
                    if (checkCoords.player === 'good') {
                        el2.score+=1
                    }
                }
            })
        })
    // })
    return moveOptions
}

const nonKingMoves = (moveOptions,board,checkPieceLocations) => {
    // console.log('mnon-kings 1',moveOptions)
    moveOptions.flat().forEach((e) => {
        const {y} = e.piece
        console.log(e.piece.y,e.y)
        if (e.y > y) {
            moveOptions.pop(e)
        }

        // console.log('mnon-kings 2',moveOptions)
        return moveOptions
        // moveData.forEach((el2) => {
        //     const nextSteps = getCoords(1, el2.x, el2.y)
        //     nextSteps.forEach((el3) => {
        //         const checkCoords = checkPieceLocations(el3[0],el3[1],board)
        //         if (checkCoords !== undefined) {
        //             if (checkCoords.player === 'good') {
        //                 el2.score+=1
        //             }
        //         }
        //     })
        // })
    })
}

// console.log(availableMoves)
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