
// -- looks for and executes available attacks -- //
export const attackLogic = async (enemyX,enemyY,currentPiece,state,checkPieceLocations) => {
    const { matrix } = state
    const { player,isKing,id,x,y } = currentPiece[0]
    var currentX = x
    var currentY = y
    var newCoords = null

    // -- LOWER LEFT ATTACK -- //
    if(currentX-1 === enemyX && currentY+1 === enemyY){
        // console.log('lower left')
        // -- non-kings can only attack one direction on the y-axis -- //
        if(player === 'bad' && isKing === false){return}

        // -- check if location is available -- //
        if(await checkPieceLocations(enemyX-1,enemyY+1,null) === undefined) {

            // -- is location on the board? -- //
            if(enemyX-1 >= 0 && enemyY+1 <= matrix.length-1){

                // -- Update pieces -- //
                const nextX = enemyX-1
                const nextY = enemyY+1
                const newCoords = {enemyX,enemyY,id,nextX,nextY}
                return newCoords
                
            }
        }

    // -- UPPER LEFT ATTACK -- //
    } else if (currentX-1 === enemyX && currentY-1 === enemyY) {
        // console.log('upper left')
        // -- non-kings can only attack one direction on the y-axis -- //
        if(player === 'good' && isKing === false){return}

        // -- check if location is available -- //
        if( await checkPieceLocations(enemyX-1,enemyY-1,null) === undefined) {

            // -- is location on the board? -- //
            if(enemyX-1 >= 0 && enemyY-1 >= 0) {

                // -- Update piece -- //
                const nextX = enemyX-1
                const nextY = enemyY-1
                const newCoords = {enemyX,enemyY,id,nextX,nextY}
                return newCoords
            }
            
        }

    // -- UPPER RIGHT ATTACK -- /
    } else if (currentX+1 === enemyX && currentY === enemyY+1) {
        // console.log('upper right')

        // -- non-kings can only attack one direction on the y-axis -- //
        if(player === 'good' && isKing === false){return}

        // -- check if location is available -- //
        if(await checkPieceLocations(enemyX+1,enemyY-1,null) === undefined) {
            
            // -- is location on the board? -- //
            if(enemyX+1 <= matrix.length-1 && enemyY-1 >= 0){

                // -- update pieces -- //
                const nextX = enemyX+1
                const nextY = enemyY-1
                const newCoords = {enemyX,enemyY,id,nextX,nextY}
                return newCoords
            }
            
        }

    // -- LOWER RIGHT ATTACK -- //
    } else if (currentX+1 === enemyX && currentY+1 === enemyY) {
        // console.log('lower right')
        // -- non-kings can only attack one direction on the y-axis -- //
        if(player === 'bad' && isKing === false){return}
        
        // -- check if location is available -- //
        if(await checkPieceLocations(enemyX+1,enemyY+1,null) === undefined) {
        
            // -- is location on the board? -- //
            if(enemyX+1 <= matrix.length-1 && enemyY+1 <= matrix.length-1) {

                // -- Update pieces -- //
                const nextX = enemyX+1
                const nextY = enemyY+1
                const newCoords = {enemyX,enemyY,id,nextX,nextY}
                return newCoords
            }

        }
    }
    return newCoords
}