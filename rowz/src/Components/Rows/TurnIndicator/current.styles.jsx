import styled from 'styled-components'
import { size,colors } from '../../rowz.plugin'

const {multiplier } = size
const {baseColor} = colors

export const TurnIndicator = styled.main`
    position: absolute;
    color: #555;
    z-index: 100000;
    height: ${50 * multiplier}px;
    width: ${180 * multiplier}px;
    margin-left: ${20 * multiplier}px;
    display: flex;
    align-items: center;
    // background: rgba(165, 165, 165, 0.116);
    
    // box-shadow: 5px 5px 20px -7px #000000;
    box-shadow: 0px 5px 20px -17px #000000;
    // box-shadow: 5px 5px 20px -17px #000000;
    // box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    // -webkit-transform: rotateX(50deg);
    // backdrop-filter: blur(12px);
    background-color:${baseColor};
    border-radius: 10px;
    border: 1px solid gray;
    transform: rotateZ(1deg);
    top:5px;

`
export const TurnIndicatorText = styled.i`
    color:black;
    margin-left: ${50 * multiplier}px;
    font-size:${15 * multiplier}px;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    opacity: .6;
`
