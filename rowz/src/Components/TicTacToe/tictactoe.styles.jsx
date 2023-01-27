import styled from "styled-components";
import { size } from "../rowz.plugin";

const { multiplier } = size
const dimensions = 350

export const TicTacToeConctaner = styled.div`
    position: absolute;
    height: 320px;
    width: ${dimensions}px;
    /* background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url(white-backround1.jpg); */
    background-size: cover; 
    background-position: center bottom;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
`