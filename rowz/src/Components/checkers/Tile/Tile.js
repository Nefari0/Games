
import './tile.css'
import '.././CheckerBoard'
import { useState,useEffect, useRef } from 'react'
// import Notice from '../Notice/Notice'
import Piece from './Piece'
const Tile = (props) => {

    
    const {
        x,
        y,
        color,
        currentPiece,
        activeLocation,
        currentPlayer,
        tileIsSelected,
        pieces,
        chainKillAvailable,
        moveOptions
    } = props

    const prevPiece = useRef()

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
    
    return(<div className='tile-location'  ><div className={`tile-color ${!activeLocation[1] ? 'hide-opac' : 'display-opac' } ${color -1 ? true : 'tile-color-dark'} `} onClick={() => props.selectTile(x,y,currentPiece)} >

        {/* ------- animated deaths ------- ----*/}
        {/* <Piece getCurrent={getCurrent}/> */}

        {/* {getCurrent('pendingDeath') === true && currentPiece[0].player === "bad" ? 
        
        <svg xmlns="http://www.w3.org/2000/svg" className="emo-head-bad" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
         : null} */}

        {/* {getCurrent('pendingDeath') === true && currentPiece[0].player === "good" ? 
        <svg xmlns="http://www.w3.org/2000/svg" className="emo-head-good" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
         : null} */}

        
    </div>
        {activeLocation[0] === x && activeLocation[1] === y ? 
        <div className='select-box-overlay'>
            <div className='cancel-select-tile' onClick={() => {props.unselectTile()}} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
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