import styled from "styled-components";
import { size } from '../../../rowz.plugin'

const { multiplier } = size

export const ControlBox = styled.main`
    position: absolute;
    height: ${150 * multiplier}px;
    width: ${150 * multiplier}px;
    right: ${-55 * multiplier}px;
    top: ${-55 * multiplier}px;
    z-index: 99;
    pointer-events: auto;
    transform: rotateX(45deg);
`;

export const ArrowButton = styled.span`
    position: absolute;
    height: ${20 * multiplier}px;
    width: ${20 * multiplier}px;
    border: solid green;
    border-width: 0 ${6 * multiplier}px ${6 * multiplier}px 0;
    display: inline-block;
    z-index: 1000;
    pointer-events: auto;
    z-index:1;
`;

export const LowRight = styled(ArrowButton)`
    left:${105 * multiplier}px;
    top: ${105 * multiplier}px;
`;

export const LowLeft = styled(ArrowButton)`
    left:${20 * multiplier}px;
    top: ${105 * multiplier}px;
    transform: rotate(90deg); /* Equal to rotateZ(45deg) */
`;

export const TopLeft = styled(ArrowButton)`
    left: ${20 * multiplier}px;
    top: ${20 * multiplier}px;
    transform: rotate(180deg);
`;

export const TopRight = styled(ArrowButton)`
    left:${105 * multiplier}px;
    top: ${20 * multiplier}px;
    transform: rotate(270deg);
`;

export const CloseController = styled.span`
    position: absolute;
    height: ${40 * multiplier}px;
    width: ${40 * multiplier}px;
    border-radius: 50%;
    background-color: red;
    top: ${55 * multiplier}px;
    left: ${55 * multiplier}px;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    pointer-events: auto;
`;