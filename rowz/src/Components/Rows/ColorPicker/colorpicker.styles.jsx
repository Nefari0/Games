import styled, { css } from "styled-components";

const colorPickerClosed = css`
    pointer-events:none;
    opacity:0;
`
export const ColorPickerContainer = styled.div`
    min-width:${300}px;
    // background-color:yellow;
    bottom:50px;
    left:80px;
    position:absolute;
    pointer-events:auto;
    transition: all 1000ms;
    ${({colorPickerOpen}) => !colorPickerOpen && colorPickerClosed}
`

const overlayActive = css`
    background-color:#fff;
    top:-90px;
    transition: all 1000ms;
    pointer-events:auto;
    -webkit-transform: rotateX(-40deg) translateZ(150px);
`
export const DarkOverLay = styled.div`
    width:100%;
    min-height:900px;
    position:absolute;
    -webkit-transform: rotateX(0deg) translateZ(1px);
    top:0px;
    transition: all 1000ms;
    pointer-events:none;
    ${({colorPickerOpen}) => colorPickerOpen && overlayActive}
`

const editOptionsClosed = css `
    opacity:0;
    pointer-events:none;
`
export const EditOptionsContainer = styled.div`
    position:absolute;
    width:300px;
    height:50px;
    // background-color:green;
    top:435px;
    right:75px;
    pointer-events:auto;
    display:flex;
    transition: all 1000ms;
    ${({colorPickerOpen}) => !colorPickerOpen && editOptionsClosed}

    button {
        background-color:white;
        position:absolute;
        // margin-left:50px;
        width:50px;
        height:50px;
        background-color:transparent;
        border:none;
    }
`