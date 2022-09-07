import { CloseButton } from "../Piece/SVG"
import {
    ControlBox,
    LowRight,
    LowLeft,
    TopLeft,
    TopRight,
    CloseController,
} from "./controls.styles"

export const Controller = (props) => {

    const {
        unselectTile,
        getCurrent,
        setMoves,
        activeLocation,
        currentPlayer,
        currentPiece,
        pieces,
        x,y
    } = props

    const actuator = (x,y) => {
        const id = getCurrent('id')
        const isKing = getCurrent('isKing')
        setMoves(x,y,id,activeLocation,true,currentPlayer,pieces,isKing,currentPiece)
    }

    return (
        <ControlBox>
            <CloseController onClick={() => unselectTile()}>
                {CloseButton('#fff')}
            </CloseController>
            <LowRight onClick={() => actuator(x+1,y+1)} />
            <LowLeft onClick={() => actuator(x-1,y+1)} />
            <TopLeft onClick={() => actuator(x-1,y-1)} />
            <TopRight onClick={() => actuator(x+1,y-1)} />
        </ControlBox>
    )
}

export default Controller