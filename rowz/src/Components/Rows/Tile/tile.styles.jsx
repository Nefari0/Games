import styled, { css } from "styled-components";
import { colors,size } from '../../rowz.plugin'

const { baseColor,secondaryColor } = colors
const { multiplier } = size

export const TilePlate = styled.main`

    position: relative;
    height: ${42 * multiplier}px;
    width: ${42 * multiplier}px;
    margin: none;
    // margin-top:10px;
    
`

const displayOpac = css`
    opacity: .4;
    transition: visibility 0s .25s, opacity .25s linear;
`

const hideOpac = css`
    opacity: 1;
    transition: visibility 0s .25s, opacity .25s linear;
`
const tileColor = (color) => {
    return (color ? `black` : 'white')
}
export const TileStyles = styled.div`
    position: relative;
    height: ${40 * multiplier}px;
    width: ${40 * multiplier}px;
    background-color: coral;
    background-color:${({color}) => (color === -1 ? `${secondaryColor}` : `${baseColor}`)};
    ${({color}) => tileColor(color === -1)}
    margin: ${1 * multiplier}px;
    ${({activeLocation}) => (!activeLocation[1] ? hideOpac : displayOpac) }
`