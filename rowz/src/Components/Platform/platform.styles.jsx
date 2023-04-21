import styled, { keyframes } from "styled-components";
import { size,boardPlacement } from "../rowz.plugin";
import walnut from "./American_walnut_pxr128_jpg.jpg"

const {
    // multiplier,
    dimensions 
} = size

// const cubeWidth = 300;
const cubeWidth = dimensions*1.3
const cubeHeight = 25;

// const Rotate = keyframes`
// from {
//   transform: rotateY(0deg);
// }
// to {
//   transform: rotateY(360deg);
// }
// `;

export const CubeContainer = styled.div`
    width: ${cubeWidth}px;
    height: ${cubeHeight}px;
    top: 300px;
    left: 100px;
    position:relative;
    -webkit-perspective: 1600px;
    -webkit-perspective-origin: 50% -240px;

`;

export const Cube = styled.div`
  -webkit-transform-style: preserve-3d;
  margin:auto; 
  transform: rotateX(-50deg)  rotateY(${({ yRotation }) => yRotation}deg); 
  // transform:rotateY(${({ yRotation }) => yRotation}deg); 

  transition: all 1000ms;
  width:${cubeWidth}px;
  height:${cubeHeight}px;
  background-color:blue;
  // z-index:0;
  pointer-events:none;

`;

const tableEdge = styled.figure`
    background-size: contain;
    background:url(${walnut});
    display: block;
    position: absolute;
    width: ${cubeWidth}px;
    border: 0.1px solid #555;
    left:-41px;
    top:-18px;
    // z-index:0;
`

export const Front = styled(tableEdge)`
  height: ${cubeHeight}px;
  background-color: yellow;
  -webkit-transform: translateZ(${cubeWidth/2}px);
`;

export const Back = styled(tableEdge)`
  height: ${cubeHeight}px;
  background-color: pink;
  -webkit-transform: rotateY(180deg) translateZ(${cubeWidth / 2}px);
`;

export const Top = styled(tableEdge)`
    -webkit-transform-style: preserve-3d;
    background-color: green;
    height: ${cubeWidth}px;
    // pointer-events:none;
    -webkit-transform: rotateX(90deg) translateZ(228px);
`;

export const Bottom = styled(tableEdge)`
  height: ${cubeWidth}px;
  width: ${cubeWidth}px;
  -webkit-transform: rotateX(-90deg) translateZ(${-200}px);
  -webkit-box-shadow: 0 10px 100px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0);
`;

export const Left = styled(tableEdge)`
  background-color: purple;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(-90deg) translateZ(230px);
`;

export const Right = styled(tableEdge)`
  background-color: orange;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(90deg) translateZ(230px);
`;