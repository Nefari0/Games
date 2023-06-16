import styled, { css } from "styled-components";
import { size } from "../../../rowz.plugin";

const { multiplier } = size

const Player = css`
    position: absolute;
    height: ${35 * multiplier}px;
    width: ${35 * multiplier}px;
    border-radius: 50%;
    background-color:#555;
    
    box-shadow: rgba(143, 143, 143, 1) 0px 3px, rgba(143, 143, 143, 1) 0px 4px, rgba(0, 0, 0, 1) 0px 4.5px;
    
    border: 1px solid #555;
    visibility: visible;
    transition: opacity .2s linear;
    z-index: 3;
    pointer-events: none;
    transform: rotateX(45deg);

    &:after{
        content: '';
        position: absolute;
        height: 90%;
        width: 90%;
        left:2px;
        top:2px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: inset -9px -5px 9px rgba(255,255,255,0.15), inset 5px 5px 19px rgba(94,104,121,0.6);
      }
`

export const GoodPlayer = styled.div`
    ${Player}
    svg {color:#fff}
`
export const BadPlayer = styled(GoodPlayer)`
    background-color:rgb(204, 204, 204);
    border: 1px solid rgb(226, 226, 226);
    svg {color:#555}

    box-shadow: rgba(143, 143, 143, 1) 0px 3px, rgba(143, 143, 143, 1) 0px 4px, rgba(0, 0, 0, 1) 0px 4.5px;
`