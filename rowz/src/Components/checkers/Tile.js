import './tile.css'
import './CheckerBoard.css'
import { useState } from 'react'
const Tile = (props) => {

    const { x,y,color,currentPiece,activeLocation,currentPlayer,tileIsSelected } = props
    // const { isKing,player } = activeLocation[2]

    // const [fullMoves,setFullMoves] = useState(false)
    
    
    // const getCurrent = () => {
    //     if(currentPiece[0] != undefined){return currentPiece[0].id}
    // }

    const getCurrent = (params) => {
        if(currentPiece[0] != undefined) {
            switch (params) {
                case 'id':
                    return currentPiece[0].id;
                case 'isKing':
                    return currentPiece[0].isKing;
                case 'player':
                    
                    // console.log('is king',currentPiece[0].isKing + currentPiece[0].player)
                    // return currentPiece[0].isKing.toString() + currentPiece[0].player.toString()
            }
   
        }
    }

    
    // console.log(activeLocation[0] === x && activeLocation[1] === y,'in tile')
    
    return(<div className='tile-location'  ><div style={{opacity:`${tileIsSelected}`}} className={`tile-color ${activeLocation[0] ? null : 'opac' } ${color -1 ? true : 'tile-color-dark'} `} onClick={() => props.selectTile(x,y,currentPiece)} >
    {/* // return(<div> */}
        {/* <p style={{color:'white'}} >{getCurrent()}</p> */}
        {currentPiece[0] != undefined ? <div className={`${currentPiece[0].player === "good" ? 'good-player' : 'bad-player'}`} ><p className='player-text'></p></div> : null}
        {/* {mappedEl} */}
        {/* <input type='text' onChange={(e) => {props.changeTitle('title',e.target.value)}} /> */}

    </div>
        {activeLocation[0] === x && activeLocation[1] === y ? <div className='select-box-overlay'>
            <div className='cancel-select-tile' onClick={() => {props.unselectTile()}} ><h1 style={{opacity:'.5',color:'#fff'}} >X</h1></div>
<div className={`low-right`} onClick={() => props.setMoves(x+1,y+1,getCurrent('id'))} ></div>
            <div className='low-left' onClick={() => props.setMoves(x-1,y+1,getCurrent('id'))}></div>
            <div className='top-left' onClick={() => props.setMoves(x-1,y-1,getCurrent('id'))}></div>
            <div className='top-right' onClick={() => props.setMoves(x+1,y-1,getCurrent('id'))}></div>
        </div> : null}
        {/* {activeLocation[0] === x && activeLocation[1] === y ? <div className='select-box' >
        </div> : null} */}
    </div>)
}

export default Tile