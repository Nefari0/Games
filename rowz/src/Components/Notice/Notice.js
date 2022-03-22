
// ************************************************************ //
// --------------- this component is for testing secial effects. making attacked piece fade off board
// ************************************************************ //

import './Notice.css'
import { useState,useEffect } from 'react'

const Notice = (props) => {

    const { x,y, activeLocation, currentPiece, pieces } = props

    // useEffect(() => {
    //     setShowNotice(false)
    // },[])

    const [ showNotice, setShowNotice ] = useState(true)

    console.log('hit notice',props)

    // const testFunc = () => {
    //     alert('does it work')
    // }

    var onEvent = () => {
        showNotice(showNotice)
    }

    const { item,content,currentPlayer } = props
    console.log('props',props)

    return (
        <div className={`notice-container ${item} ${showNotice ? true : 'hidden'}`} onClick={() => setShowNotice()} >
            <p style={{color:'#fff',textTransform:'none'}}> here it is{content}</p>

        {activeLocation[0] === x && activeLocation[1] === y ? <div className='select-box-overlay'>
        <div className='cancel-select-tile' onClick={() => {props.unselectTile()}} ><h1 style={{opacity:'.5',color:'#fff'}} >X</h1></div>
        <div className={`low-right`} onClick={() => props.setMoves(x+1,y+1,props.getCurrent('id'),activeLocation,true,currentPlayer,pieces,props.getCurrent('isKing'),currentPiece)} ></div>
        <div className='low-left' onClick={() => props.setMoves(x-1,y+1,props.getCurrent('id'),activeLocation,true,currentPlayer,pieces,props.getCurrent('isKing'),currentPiece)}></div>
        <div className='top-left' onClick={() => props.setMoves(x-1,y-1,props.getCurrent('id'),activeLocation,true,currentPlayer,pieces,props.getCurrent('isKing'),currentPiece)}></div>
        <div className='top-right' onClick={() => props.setMoves(x+1,y-1,props.getCurrent('id'),activeLocation,true,currentPlayer,pieces,props.getCurrent('isKing'),currentPiece)}></div>
    </div> : null}
        </div>
    )
}

export default Notice