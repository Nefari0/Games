import { SadFace, SmileFace } from './SVG'
import { GoodPlayer,BadPlayer } from './piece.styles'
import { size } from '../../../rowz.plugin'
import Crown from '../Crown/crown.component'
import '../tile.styles.css'

const { multiplier } = size

export const PIECE_CLASSES = {
    good:'good',
    bad:'bad'
};

const getPieceClass = (pieceClass = PIECE_CLASSES.good) => 
 ({
    [PIECE_CLASSES.good]:GoodPlayer,
    [PIECE_CLASSES.bad]:BadPlayer 
 }[pieceClass]);

const Piece = ({items,activeLocation}) => {    

    const {isKing,player,x,y,pendingDeath} = items
    
    const PieceClass = getPieceClass(player)

    const engine = {
        left:`${5+(x*(43 * multiplier))}px`,
        top:`${10+(y*(42 * multiplier))}px`,
        position:'absolute',
        transition: "all 1000ms",
    }

    return (
        <div style={engine}>
            <PieceClass>
                {pendingDeath && SadFace()}
                {isKing && <Crown />}
                {isKing && !pendingDeath && SmileFace()}
            </PieceClass>
        </div>
    )
}

export default Piece