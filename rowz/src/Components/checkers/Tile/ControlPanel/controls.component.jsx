import { CloseButton } from "../Piece/SVG"
import { useState } from "react"
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
        x,y,
        chainKillAvailable,
        moveOptions,
        previousPiece,
    } = props

    const selectionConstraint = (coords) => {
        if (activeLocation[2] != undefined && previousPiece != null) {
            console.log('NOT UNDEFINED!',coords[1],y-1)
            if (currentPiece[0].id === previousPiece.id && moveOptions[0] != undefined) {
                if (coords[0] === x+1 && coords[1] === y-1) {
                    console.log('true',)
                    return 'top_right'
                } else if (coords[0] === x+1 && coords[1] === y+1) {
                    return 'low_right'
                } else if (coords[0] === x-1 && coords[1] === y+1) {
                    return 'low_left'
                } else if (coords[0] === x-1 && coords[1] === y-1) {
                    return 'top_left'
                }
                // x-1,y-1
            }
        }
    }

    // selectionConstraint()

    const actuator = (x,y) => {
        const id = getCurrent('id')
        const isKing = getCurrent('isKing')
        setMoves(x,y,id,activeLocation,true,currentPlayer,pieces,isKing,currentPiece)
    }

    return (
        <>
       
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
 
        </>
    )
}

export default Controller