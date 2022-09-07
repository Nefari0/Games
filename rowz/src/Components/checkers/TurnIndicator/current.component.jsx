import { GoodPlayer,BadPlayer } from '../Tile/Piece/piece.styles'
import { TurnIndicator,TurnIndicatorText } from './current.styles'

const CurrentPlayer = (props) => {

    const { currentPlayer } = props

    return(
        <TurnIndicator>
            {currentPlayer === 'good' ?<GoodPlayer/>:<BadPlayer/>}
            <TurnIndicatorText>Current Player</TurnIndicatorText>
        </TurnIndicator>
        )
        
    }
    export default CurrentPlayer