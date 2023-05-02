import styled, { css } from "styled-components";
import { size } from "../../../rowz.plugin";

const { multiplier } = size

const Player = css`
    position: absolute;
    height: ${35 * multiplier}px;
    width: ${35 * multiplier}px;
    border-radius: 50%;
    background: linear-gradient(0turn,#555,rgb(143, 143, 143));
    box-shadow: rgba(143, 143, 143, 1) 0px 3px, rgba(143, 143, 143, 1) 0px 4px, rgba(0, 0, 0, 1) 0px 4.5px;
    
    border: .1px solid #fff;
    visibility: visible;
    transition: opacity .2s linear;
    z-index: 3;
    pointer-events: none;
    transform: rotateX(45deg);

    &:after{
        content: '';
        position: absolute;
        height: 80%;
        width: 80%;
        left:4px;
        top:4px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);
      }
`

export const GoodPlayer = styled.div`
    ${Player}
    svg {color:#fff}
`
export const BadPlayer = styled(GoodPlayer)`
    background: linear-gradient(0turn,rgb(160, 158, 158),rgb(226, 226, 226));
    border: .1px solid #555;
    svg {color:#555}
`