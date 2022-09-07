import styled from "styled-components";

export const ControlBox = styled.main`
    position: absolute;
    height: 150px;
    width: 150px;
    right: -55px;
    top: -55px;
    z-index: 99;
    pointer-events: auto;
`;

export const ArrowButton = styled.span`
    position: absolute;
    height: 20px;
    width: 20px;
    border: solid green;
    border-width: 0 6px 6px 0;
    display: inline-block;
    z-index: 1000;
    pointer-events: auto;
    z-index:1;
`;

export const LowRight = styled(ArrowButton)`
    left:105px;
    top: 105px;
`;

export const LowLeft = styled(ArrowButton)`
    left:20px;
    top: 105px;
    transform: rotate(90deg); /* Equal to rotateZ(45deg) */
`;

export const TopLeft = styled(ArrowButton)`
    left: 20px;
    top: 20px;
    transform: rotate(180deg);
`;

export const TopRight = styled(ArrowButton)`
    left:105px;
    top: 20px;
    transform: rotate(270deg);
`;

export const CloseController = styled.span`
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: red;
    top: 55px;
    left: 55px;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    pointer-events: auto;
`;