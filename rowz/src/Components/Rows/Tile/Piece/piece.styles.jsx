import styled, { css } from "styled-components";
import { size } from "../../../rowz.plugin";

const { multiplier } = size

const Player = css`
    position: absolute;
    height: ${35 * multiplier}px;
    width: ${35 * multiplier}px;
    border-radius: 50%;
    background: linear-gradient(0turn,#555,rgb(143, 143, 143));
    box-shadow: 5px 5px 20px -7px #000000;
    border: .1px solid #fff;
    visibility: visible;
    opacity: 1;
    transition: opacity .2s linear;
    z-index: 3;
    pointer-events: none;
`

export const GoodPlayer = styled.div`${Player}`
export const BadPlayer = styled(GoodPlayer)`
    background: linear-gradient(0turn,rgb(160, 158, 158),rgb(226, 226, 226));
    border: .1px solid #555;
`