import styled, { css } from "styled-components";

const hidden = css`
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 4s, opacity 4s linear;
    pointer-events:none;
`

export const PopupContainer = styled.section`
    width:300px;
    min-height:50px;
    position:sticky;
    margin:auto;
    top:200px;
    z-index:1;
    pointer-events:auto;
    background-color: rgb(240, 240, 240);
    box-shadow: 0px 5px 20px -7px #000000;

    ${({notice,alert}) => !notice && !alert && hidden}
`