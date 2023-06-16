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

    h1 {
        font-weight:600;
        color:#ff3300;
        text-transform: uppercase;
        text-shadow: #fff 1px 1px 10px;
    }

    ${({notice,alert}) => !notice && !alert && hidden}
    `