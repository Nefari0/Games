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
        font-weight:400;
        color:red;
        text-transform: uppercase;
    }

    ${({notice,alert}) => !notice && !alert && hidden}
`