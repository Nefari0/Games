
import './tile.css'

const Piece = (props) => {

    return (
        <div>
            {props.getCurrent('player') ==='good' ? 
            <div className={`good-player ${props.getCurrent('isInGame') ? false : `hidden`}`}>{props.getCurrent('isKing') === true ? <p className='player-text'>king</p> : null}</div>
        :
            <div className={`bad-player ${props.getCurrent('isInGame') ? false : 'hidden'}`}>{props.getCurrent('isKing') === true ? <p className='player-text'>king</p> : null}</div>}
            
        </div>
    )
}

export default Piece