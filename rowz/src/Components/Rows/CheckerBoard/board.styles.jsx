import styled from "styled-components"
import {size,boardPlacement} from '../../rowz.plugin'

const { multiplier,dimensions } = size
// const dimensions = 350
 
export const CheckerTable = styled.main`
    ${boardPlacement}
    position: absolute;
    height: ${dimensions*multiplier}px;
    width: ${dimensions*multiplier}px;
    padding-top:10px;
    background-color: rgb(240, 240, 240);
    // background-color:red;
    // opacity:.5;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: stretch;
    // box-shadow: 0px 5px 20px -7px #000000;
    box-shadow: 0px 5px 20px -17px #000000;
    transform: rotateZ(3deg);
    z-index: 0;
    -webkit-transform-style: preserve-3d;

    @media (max-width:400px) {
        -webkit-transform: scale(.8);
        -ms-transform: scale(.8);
        transform: scale(.8);
        margin-left:-30px;
    }

    @media (max-width:350px) {
        -webkit-transform: scale(.7);
        -ms-transform: scale(.7);
        transform: scale(.7);
        // margin-left:-0px;
    }
`

export const Rowz = styled.span`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: stretch;
`
