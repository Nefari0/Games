import styled, { css } from "styled-components";
// import { size } from "../../rowz.plugin";

export const ColorPickerContainer = styled.div`
    min-width:${300}px;
    background-color:yellow;
    bottom:50px;
    left:80px;
    position:absolute;
    pointer-events:auto;
`

const overlayActive = css`
    background-color:#fff;
    top:-90px;
    transition: all 1000ms;
    -webkit-transform: rotateX(-40deg) translateZ(150px);

    @{}
`
export const DarkOverLay = styled.div`
    width:100%;
    min-height:900px;
    position:absolute;
    -webkit-transform: rotateX(0deg) translateZ(1px);
    top:0px;
    transition: all 1000ms;
    ${({colorPickerOpen}) => colorPickerOpen && overlayActive}
`

export const EditOptions = styled.div`
    width:300px;
    height:50px;
    background-color:green;
    position:absolute;
    top:-55px;
`