
import './tile.css'

const Piece = ({items}) => {    

    const {isKing,player,x,y,pendingDeath} = items

    const locations = {
        left:`${7+(x*42)}px`,
        top:`${3+(y*42)}px`,
        position:'absolute',
        transition: "all 1000ms",
    }

    return (
        <div style={locations}>
            {player ==='good' ? 
            // <div className={`good-player ${props.getCurrent('isInGame') ? false : `hidden`}`}>{props.getCurrent('isKing') === true ? <p className='player-text'>king</p> : null}</div>
            <div className={`good-player `}>
                {isKing === true ? <p className='player-text'>king</p> : null}
                {isKing && <p>king</p>}
            </div>
        :
            <div className={`bad-player`}>{isKing === true ? <p className='player-text'>king</p> : null}</div>
            // <div className={`bad-player ${props.getCurrent('isInGame') ? false : 'hidden'}`}>{props.getCurrent('isKing') === true ? <p className='player-text'>king</p> : null}</div>
            }
            
        </div>
    )
}

export default Piece