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
const top = 200

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
    top: ${top}px;
    position:relative;
    -webkit-perspective: 1600px;
    -webkit-perspective-origin: 50% -240px;
    // background-color:blue;

    @media (max-width:550px) {
      -webkit-transform: scale(.8);
      -ms-transform: scale(.8);
      transform: scale(.8);
      top:${top*.8}px;
  }

  
  @media (max-width:450px) {
    -webkit-transform: scale(.6);
    -ms-transform: scale(.6);
    transform: scale(.6);
    top:${top*.6}px;
  }

  @media (max-width:400px) {
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    top:${top*.5}px;
}

@media (max-width:350px) {
  -webkit-transform: scale(.45);
  -ms-transform: scale(.45);
  transform: scale(.45);
}

@media (max-width:290px) {
  -webkit-transform: scale(.4);
  -ms-transform: scale(.4);
  transform: scale(.4);
}

`;

export const Cube = styled.div`
  -webkit-transform-style: preserve-3d;
  margin:auto; 
  transform:
    rotateX(-45deg)  
    // rotateX(-20deg)
    rotateY(${({ yRotation }) => yRotation}deg)
  ; 
  // transform:rotateY(${({ yRotation }) => yRotation}deg); 

  transition: all 1000ms;
  height:${cubeHeight}px;
  // background-color:red;
  // z-index:0;
  pointer-events:none;
`;

const tableEdge = styled.figure`
    background-size: contain;
    background:url(${walnut});
    display: block;
    position: absolute;
    width: ${cubeWidth}px;
    border: 1px solid gray;
    left:-41px;
    top:-18px;
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
  -webkit-transform: rotateX(-90deg) translateZ(${-203}px);
  // -webkit-box-shadow: 0 10px 100px rgba(0, 0, 0, 0.7);
  // -webkit-box-shadow: 0 10px 100px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 5px 20px -1px #000000;
  // background-color: rgba(0, 0, 0, 0);
`;

export const Left = styled(tableEdge)`
  background-color: purple;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(-90deg) translateZ(228px);
`;

export const Right = styled(tableEdge)`
  background-color: orange;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(90deg) translateZ(228px);
`;