import styled from "styled-components"

export const CheckerTable = styled.main`
    position: absolute;
    height: 350px;
    width: 350px;
    margin-top: 30px;
    background-color: rgb(240, 240, 240);
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url(white-backround1.jpg);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: stretch;
    overflow: hidden;
    box-shadow: 0px 5px 20px -7px #000000;
    z-index: 0;
`

export const Rowz = styled.span`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: stretch;
`
