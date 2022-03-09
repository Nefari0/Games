import './tile.css'
import './CheckerBoard.css'
const Tile = (props) => {

    const { x,y,color,currentPiece,activeLocation } = props
    
    const getCurrent = () => {
        if(currentPiece[0] != undefined){return currentPiece[0].id}
    }

    // console.log(activeLocation[0] === x && activeLocation[1] === y,'in tile')

    return(<div className='tile-location'><div className={`tile-color ${color -1 ? true : 'tile-color-dark'} `} onClick={() => props.selectTile(x,y,currentPiece)} >
    {/* // return(<div> */}
        {/* <p style={{color:'white'}} >{getCurrent()}</p> */}
        {currentPiece[0] != undefined ? <div ><p className='player-text'>{currentPiece[0].player}</p></div> : null}
        {/* {mappedEl} */}
        {/* <input type='text' onChange={(e) => {props.changeTitle('title',e.target.value)}} /> */}

    </div>
        {activeLocation[0] === x && activeLocation[1] === y ? <div className='select-box-overlay'>
            <div className='low-right' onClick={() => props.setMoves(x+1,y+1,getCurrent())} ></div>
            <div className='low-left' onClick={() => props.setMoves(x-1,y+1,getCurrent())}></div>
            <div className='top-left' onClick={() => props.setMoves(x-1,y-1,getCurrent())}></div>
            <div className='top-right' onClick={() => props.setMoves(x+1,y-1,getCurrent())}></div>
        </div> : null}
        {/* {activeLocation[0] === x && activeLocation[1] === y ? <div className='select-box' >
        </div> : null} */}
    </div>)
}

export default Tile