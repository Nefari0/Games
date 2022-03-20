
// ************************************************************ //
// --------------- this component is for testing secial effects. making attacked piece fade off board
// ************************************************************ //

import './Notice.css'
import { useState,useEffect } from 'react'

const Notice = (props) => {

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
        </div>
    )
}

export default Notice