// -- looks for and executes available attacks -- //
export const attackLogic = async (enemyX,enemyY,currentPiece,state,checkPieceLocations) => {
    const { matrix } = state
    const { player,isKing,id,x,y } = currentPiece[0]
    var currentX = x
    var currentY = y
    var newCoords = null

    // -- LOWER LEFT ATTACK -- //
    if(currentX-1 === enemyX && currentY+1 === enemyY){
        console.log('lower left')
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
        console.log('upper left')
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
        console.log('upper right')

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
        console.log('lower right')
        // -- non-kings can only attack one direction on the y-axis -- //
        if(player === 'bad' && isKing === false){return}
        
        // -- check if location is available -- //
        if(await checkPieceLocations(enemyX+1,enemyY+1,null) === undefined) {
        
            // -- is location on the board? -- //
            if(enemyX+1 >= 0 && enemyY+1 <= matrix.length-1) {

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

// --- WILL BE MOVING "chainKills" IN B CheckerBoard COMPONENT HERE --- //
// export const chainAttacksLogic = async (x,y,updatedPieces,currentPiece,attack) => {
//     // --- the "attack" parameter is a boolean used for checking whether or not an attack is available, without executing attack --- //
//     const { matrix,moveOptions } = this.state
//     const { player } = currentPiece[0]
//     var updateMoves = [...moveOptions]
//     const upLeft = [-1,-1]
//     const upRight = [1,-1]
//     const downLeft = [-1,1]
//     const downRight = [1,1]
//     const moves = [upLeft,upRight,downLeft,downRight]

//     moves.forEach(e => {
//         var locatePiece = this.checkPieceLocations(x+e[0],y+e[1],updatedPieces)
        
//         // --- check for adjacent pieces / is piece friend of foe? --- //
//         if(locatePiece !== undefined && locatePiece.player !== player){
            
//             // --- if it is a foe, is the next location over available? --- //
//             var nextX = parseInt(e[0]) + locatePiece.x // potential jump to x
//             var nextY = parseInt(e[1]) + locatePiece.y // potential jump to y
//             var availMove = this.checkPieceLocations(nextX,nextY,updatedPieces) // are available "jump to" coordinates available

//             if(availMove === undefined) {
                
//                 // -- is location on the board -- //
//                 if(nextX >= 0 && nextX <= matrix.length-1){
//                     if(nextY >= 0 && nextY <= matrix.length-1) {

//                         // --- can move be made if isKing === false ? --- //
//                         // --- "good" non-kings
//                         if(player === "good" && nextY < currentPiece[0].y){
//                             if(currentPiece[0].isKing === false){return}
//                         }
                        
//                         // --- "bad" non-kings
//                         if(player === "bad" && nextY > currentPiece[0].y){
//                             if(currentPiece[0].isKing === false){return}
//                         }

//                         // moveOptions.push([locatePiece.x,locatePiece.y])
//                         updateMoves.push([locatePiece.x,locatePiece.y])

//                         // --- this returns move options without making an attack --- //
//                         // if(attack === false){return this.setState({moveOptions:moveOptions})}
//                         if(attack === false){
//                             if(moveOptions.length < 2){this.setState({chainKillData:currentPiece})}
//                             return this.setState({moveOptions:updateMoves})
//                         }

//                         this.setState({
//                             moveOptions:moveOptions,
//                             chainKillData:currentPiece,
//                             enemyX:locatePiece.x,
//                             enemyY:locatePiece.y,
//                             chainKillAvailable:true
//                         })
                        
//                         this.switchPlayer(player)
//                         return
//                     }
//                 }
                
//             }
            
//         }
//         return
//     })
// }