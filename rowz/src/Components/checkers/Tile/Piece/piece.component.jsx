import { SadFace, SmileFace } from './SVG'
import { GoodPlayer,BadPlayer } from './piece.styles'
import Crown from '../Crown/crown.component'
import '../tile.styles.css'

const Piece = ({items}) => {    

    const {isKing,player,x,y,pendingDeath} = items

    const engine = {
        left:`${7+(x*42)}px`,
        top:`${3+(y*42)}px`,
        position:'absolute',
        transition: "all 1000ms",
    }

    return (
        <div style={engine}>

            {player ==='good' ? 
            <GoodPlayer>
                {isKing && <Crown />}
                {pendingDeath && SadFace('#fff')}
                {isKing && !pendingDeath ? SmileFace('#fff') : null}
            </GoodPlayer>
            :
            <BadPlayer>
                {pendingDeath && SadFace('#555')}
                {isKing && <Crown />}
                {isKing && !pendingDeath ? SmileFace('#555') : null}
            </BadPlayer>
            }
            
        </div>
    )
}

export default Piece