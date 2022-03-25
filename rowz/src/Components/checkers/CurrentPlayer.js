// import './CheckerBoard.css'
// import './Tile'
import { useEffect,useState } from 'react'

const CurrentPlayer = (props) => {

    const { currentPlayer } = props

    // const [player,setPlayer] = useState(true)

    // useEffect(() => {
    //     changePiece(currentPlayer)
    // },[])

    // var changePiece = () => {
    //     if(currentPlayer === 'good'){
    //         setPlayer(true)
    //     } else if (currentPlayer === 'bad') {setPlayer(false)}
    // }

    return(<div className={`turn-indicator`}>
        {/* <div className={`good-player ${player ? true : 'bad-player'}`}></div> */}
        {currentPlayer === 'good' ? <div className='good-player'></div> : <div className='bad-player'></div>}<p className='turn-indicator-text' >current player</p>
    </div>)
}

export default CurrentPlayer