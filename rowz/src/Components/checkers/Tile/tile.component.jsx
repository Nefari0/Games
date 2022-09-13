import './tile.styles.css'
import { TilePlate } from './tile.styles'
import Controller from './ControlPanel/controls.component'

const Tile = (props) => {

    
    const {
        x,
        y,
        color,
        currentPiece,
        activeLocation,
        currentPlayer,

        pieces,

   
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

        <div className={`tile-color ${!activeLocation[1] ? 'hide-opac' : 'display-opac' } ${color -1 ? true : 'tile-color-dark'} `} onClick={() => props.selectTile(x,y,currentPiece)} ></div>
        
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
        />
        :
        null
        }
        
    </TilePlate>)
}

export default Tile