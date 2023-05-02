import styled from "styled-components";
import { size,colors } from '../../../rowz.plugin'

const { multiplier } = size
const  { tertiary,baseColor } = colors

export const ControlBox = styled.main`
    position: absolute;
    height: ${150 * multiplier}px;
    width: ${150 * multiplier}px;
    right: ${-55 * multiplier}px;
    top: ${-55 * multiplier}px;
    z-index: 99;
    pointer-events: auto;
    transform: rotateX(45deg);
    border: solid ${tertiary} 1px;
    margin:0px;

    // box-shadow:
    //     rgba(255, 139, 92, 0.6) -1px 5px, 
    //     rgba(255, 139, 92, 0.5) -2px 10px, 
    //     rgba(255, 139, 92, 0.4) -3px 15px, 
    //     rgba(255, 139, 92, 0.3) -4px 20px, 
    //     rgba(255, 139, 92, 0.2) -5px 25px
    // ;

        box-shadow:
        rgba(255, 139, 92, 0.6) -.5px 5px, 
        rgba(255, 139, 92, 0.5) -1.5px 10px, 
        rgba(255, 139, 92, 0.4) -2px 15px, 
        rgba(255, 139, 92, 0.3) -2.5px 20px, 
        rgba(255, 139, 92, 0.2) -3px 25px
    ;

    border-radius:10px;
`;

export const ArrowButton = styled.span`
    position: absolute;
    height: ${30 * multiplier}px;
    width: ${30 * multiplier}px;
    border: solid green;
    border-width: 0 ${6 * multiplier}px ${6 * multiplier}px 0;
    display: inline-block;
    z-index: 1000;
    pointer-events: auto;
    z-index:1;
    
    animation: blinker 1s linear infinite;
    
    @keyframes blinker {
        50% {
          opacity: .3;
        }
      }
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
    // box-shadow: 0px 5px 20px -1px #000000;
`;