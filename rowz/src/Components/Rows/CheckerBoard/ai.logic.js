
export const AI = (board,checkPieceLocations,setMoves,state) => {
    const {matrix} = state
    
    var availableMoves = []

    board.forEach(piece => {
        if (piece.player === 'bad') {
            availableMoves.push(initialMoves(piece,board,checkPieceLocations,setMoves,matrix))
        }
    });

    // --- AVOID SINGLE ENAMY PIECES --- //
    const evalSingleThreat = findThreats(availableMoves,board,checkPieceLocations)

    // --- HUNT FOR SINGLE PIECE --- //
    const huntingSingleItem = scanning(evalSingleThreat,board,checkPieceLocations,matrix)

    // Get highest score //
    const orderByHighestScore = huntingSingleItem.flat().sort((a, b) => b.score - a.score)

    // Remove Illegal moves //
    const nonIllegalMoves = orderByHighestScore.filter(e => !(e.piece.y < e.y && e.piece.isKing === false))

    // Only keep moves that are on the board
    const onBoardOnlyMoves = nonIllegalMoves.filter(e => 
        (e.x >= 0 && e.x <= matrix.length-1 && e.y >= 0 && e.y <= matrix.length-1)
    )

    // Highest scoring move //
    const { x, y, piece, score } = onBoardOnlyMoves[0];

    // Execute move //
    setMoves(x, y, [piece], score);
}

//  Gets coordinates surrounding input location
const getCoords = (counter, x = 0, y = 0) => {
    const moves = [
        [x+counter,y+counter], // down right
        [x-counter,y+counter], // down left
        [x-counter,y-counter], // up left
        [x+counter,y-counter], // up right
    ]
    return(moves)
}

// Check for available attacks
const attacks = (currentX,currentY,enemyX,enemyY,checkPieceLocations,matrix,allPieces) => {
    var availableAttack = false

        // -- LOWER LEFT ATTACK -- //
    if(currentX-1 === enemyX && currentY+1 === enemyY){
        // -- check if location is available -- //
        if(checkPieceLocations(enemyX-1,enemyY+1,allPieces) === undefined) {
        //     // -- is location on the board? -- //
        if(enemyX-1 >= 0 && enemyY+1 <= matrix.length-1){return true}
    }

    // -- UPPER LEFT ATTACK -- //
    } else if (currentX-1 === enemyX && currentY-1 === enemyY) {
        console.log('upper left')
        // -- check if location is available -- //
        if( checkPieceLocations(enemyX-1,enemyY-1,allPieces) === undefined) {
            // -- is location on the board? -- //
                if(enemyX-1 >= 0 && enemyY-1 >= 0) {return true}
        }

    // -- UPPER RIGHT ATTACK -- /
    } else if (currentX+1 === enemyX && currentY === enemyY+1) {

        // -- check if location is available -- //
        if(checkPieceLocations(enemyX+1,enemyY-1,allPieces) === undefined) {
            // -- is location on the board? -- //
            if(enemyX+1 <= matrix.length-1 && enemyY-1 >= 0){
                availableAttack = true
                return availableAttack
            }           
        }

    // -- LOWER RIGHT ATTACK -- //
    } else if (currentX+1 === enemyX && currentY+1 === enemyY) {
        console.log('lower right')
        
        // -- check if location is available -- //
        if(checkPieceLocations(enemyX+1,enemyY+1,allPieces) === undefined) {
            // -- is location on the board? -- //
            if(enemyX+1 <= matrix.length-1 && enemyY+1 <= matrix.length-1) {return true}
        }
    } 
}

export const initialMoves = (piece,currentBoard,checkPieceLocations,setMoves,matrix) => {

    var availableMoves = []

    const { x,y } = piece
    const moves = getCoords(1,x,y)

    for (let move in moves) {
        var nextPiece = checkPieceLocations(moves[move][0],moves[move][1],currentBoard)
        var moveObj = {
            piece:piece,
            x:moves[move][0],
            y:moves[move][1],
            score:2
        }
        if (nextPiece === undefined) {
            availableMoves.push(moveObj)
        } else if (nextPiece.player === 'good') {
            var availableAttack = attacks(piece.x,piece.y,nextPiece.x,nextPiece.y,checkPieceLocations,matrix,currentBoard)
            if (availableAttack) {
                moveObj.score=500
                availableMoves.push(moveObj)
            }
        }
    }
    return availableMoves
};

const findThreats = (initialMoves,board,checkPieceLocations) => {
    initialMoves.forEach((moveData) => {
        moveData.forEach((el2) => {
            const nextSteps = getCoords(1, el2.x, el2.y)
            nextSteps.forEach((el3) => {
                const checkCoords = checkPieceLocations(el3[0],el3[1],board)
                // Avoids moving too close to enemy pieces
                if (checkCoords !== undefined) {
                    if (checkCoords.player === 'good') {
                        el2.score-=100
                        // Sneaks up on enemy pieces from behind if they are not kings
                        if (checkCoords.isKing === false) {
                            if (checkCoords.y > el2.y) 
                                el2.score += 100

                        }
                    }
                }
            })
        })
    })
    return initialMoves
}

const scanning = (moveOptions,board,checkPieceLocations,matrix) => {
    const maxDistance = 20
    const enemyPieces = board.filter(e => e.player==='good')

    moveOptions.flat().forEach((move) => {
        enemyPieces.forEach((enemy) => {
            const yDistance = (move.y-enemy.y)
            const xDistance = (move.x-enemy.x)
            const distance = (1+Math.sqrt((xDistance*xDistance) + (yDistance*yDistance)))
            const score = maxDistance - distance
            move.score += score
        })
    })
    return moveOptions
}