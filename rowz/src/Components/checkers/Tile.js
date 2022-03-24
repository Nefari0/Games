import './tile.css'
import './CheckerBoard.css'
import { useState,useEffect, useRef } from 'react'
// import Notice from '../Notice/Notice'
import Piece from './Piece'
const Tile = (props) => {

    
    const { x,y,color,currentPiece,activeLocation,currentPlayer,tileIsSelected,pieces,chainKillAvailable,moveOptions } = props

    // const [inPlay,setInPlay] = useState(false)
    // const [makeMove,setMakeMove] = useState(false)

    const prevPiece = useRef()

    // useEffect(() => {
    //     prevPiece.alive = currentPiece[0]
    // })
    
    if(moveOptions.length > 0){
        if ([x+1,y+1] === moveOptions) {console.log('here is the move',x+1, moveOptions)}
    }
    
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

    return(<div className='tile-location'  ><div className={`tile-color ${!activeLocation[0] ? 'hide-opac' : 'display-opac' } ${color -1 ? true : 'tile-color-dark'} `} onClick={() => props.selectTile(x,y,currentPiece)} >


        {/* {currentPiece[0] !== undefined ? <div className={`${currentPiece[0].player === "bad" ? 'bad-player' : 'dead-piece'}`} > {currentPiece[0].isKing === true ? <p className='player-text'>king</p> : null} </div> : null} */}

        {/* {currentPiece[0] !== undefined ? <div className={`${currentPiece[0].player === "good" ? 'good-player' : 'dead-piece'}`} > {currentPiece[0].isKing === true ? <p className='player-text'>king</p> : null} </div> : null} */}

        {/* ------- animated deaths ------- original code above ----*/}
        <Piece setMoves={props.setMoves} prevPiece={prevPiece.current} getCurrent={getCurrent} x={x} y={y} activeLocation={activeLocation} pieces={pieces} currentPiece={currentPiece}/>

        {getCurrent('pendingDeath') === true && currentPiece[0].player === "bad" ? 
        
        <svg xmlns="http://www.w3.org/2000/svg" className="emo-head-bad" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
         : null}

        {getCurrent('pendingDeath') === true && currentPiece[0].player === "good" ? 
        <svg xmlns="http://www.w3.org/2000/svg" className="emo-head-good" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
         : null}
        
    </div>
        {activeLocation[0] === x && activeLocation[1] === y ? 
        <div className='select-box-overlay'>
            <div className='cancel-select-tile' onClick={() => {props.unselectTile()}} ><h1 style={{opacity:'.5',color:'#fff'}} >X</h1></div>
            <div className={`low-right`} onClick={() => props.setMoves(x+1,y+1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'),currentPiece)} ></div>
            <div className='low-left' onClick={() => props.setMoves(x-1,y+1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'),currentPiece)}></div>
            <div className='top-left' onClick={() => props.setMoves(x-1,y-1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'),currentPiece)}></div>
            <div className='top-right' onClick={() => props.setMoves(x+1,y-1,getCurrent('id'),activeLocation,true,currentPlayer,pieces,getCurrent('isKing'),currentPiece)}></div>
            
        </div>
         : 
        null
        }
        
    </div>)
}

export default Tile