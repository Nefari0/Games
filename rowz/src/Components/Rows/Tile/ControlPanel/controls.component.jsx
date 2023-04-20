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
        setMoves,
        activeLocation,
        currentPiece,
        x,y,
        chainKillAvailable,
        moveOptions,
        previousPiece,
    } = props

    const selectionConstraint = (coords) => {
        if (activeLocation[2] !== undefined && previousPiece !== null) {
            if (currentPiece[0].id === previousPiece.id && moveOptions[0] !== undefined) {
                if (coords[0] === x+1 && coords[1] === y-1) {
                    return 'top_right'
                } else if (coords[0] === x+1 && coords[1] === y+1) {
                    return 'low_right'
                } else if (coords[0] === x-1 && coords[1] === y+1) {
                    return 'low_left'
                } else if (coords[0] === x-1 && coords[1] === y-1) {
                    return 'top_left'
                }
            }
        }
    };

    const actuator = (x,y) => {
        setMoves(x,y,currentPiece)
    };

    return (
        <ControlBox>
            
            <CloseController onClick={() => unselectTile()}>
                {CloseButton('#fff')}
            </CloseController>

            {!chainKillAvailable || selectionConstraint(moveOptions) === 'low_right' ?
            <LowRight onClick={() => actuator(x+1,y+1)} />:null}

            {!chainKillAvailable || selectionConstraint(moveOptions) === 'low_left' ?
            <LowLeft onClick={() => actuator(x-1,y+1)} />:null}

            {!chainKillAvailable || selectionConstraint(moveOptions) === 'top_left' ?
            <TopLeft onClick={() => actuator(x-1,y-1)} />:null}

            {!chainKillAvailable || selectionConstraint(moveOptions) === 'top_right' ?
            <TopRight onClick={() => actuator(x+1,y-1)} />:null}

        </ControlBox>
    )
};

export default Controller