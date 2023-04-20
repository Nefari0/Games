import styled from 'styled-components'
import { size,playerStatusPlacement } from '../../rowz.plugin'

const {multiplier } = size

export const TurnIndicator = styled.main`
    position: absolute;
    color: #555;
    z-index: 100000;
    height: ${50 * multiplier}px;
    width: ${180 * multiplier}px;
    margin-left: ${20 * multiplier}px;
    display: flex;
    align-items: center;
    background: rgba(165, 165, 165, 0.116);
    box-shadow: 5px 5px 20px -7px #000000;
    backdrop-filter: blur(12px);
    border-radius: 10px;
    ${playerStatusPlacement}
`
export const TurnIndicatorText = styled.i`
    margin-left: ${50 * multiplier}px;
    font-size:${15 * multiplier}px;
    font-weight: 800;
    font-family: 'Poppins', sans-serif;
    opacity: .6;
`
