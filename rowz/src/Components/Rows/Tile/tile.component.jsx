import './tile.styles.css'
import { TilePlate,TileStyles } from './tile.styles'
import Controller from './ControlPanel/controls.component'

const Tile = (props) => {

    
    const {
        x,
        y,
        color,
        currentPiece,
        activeLocation,
        currentPlayer,
        chainKillAvailable,
        moveOptions,
        pieces,
        previousPiece,
   
        setMoves
    } = props
    
    const getCurrent = (params) => {
        if(currentPiece[0] !== undefined) {
            switch (params) {
                case 'id':
                    return currentPiece[0].id;
                case 'isKing':
                    return currentPiece[0].isKing;
                case 'pendingDeath':
                    return currentPiece[0].pendingDeath
                case 'isInGame':
                    return currentPiece[0].isInGame
                case 'player':
                    return currentPiece[0].player
            }
   
        }
    }
    
    return(
        <TilePlate
            activeLocation={activeLocation}
            color={color}
        >

            <TileStyles
                onClick={() => props.selectTile(x,y,currentPiece)}
                activeLocation={activeLocation}
                color={color}
            />
            
            {activeLocation[0] === x && activeLocation[1] === y ? 
            <Controller
                getCurrent={getCurrent}
                setMoves={setMoves}
                x={x}
                y={y}
                currentPiece={currentPiece}
                currentPlayer={currentPlayer}
                pieces={pieces}
                activeLocation={activeLocation}
                unselectTile={props.unselectTile}
                chainKillAvailable={chainKillAvailable}
                moveOptions={moveOptions}
                previousPiece={previousPiece}
            />
            :
            null
            }
        
        </TilePlate>
    )
}

export default Tile