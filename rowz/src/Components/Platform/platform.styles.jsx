import styled, { keyframes } from "styled-components";
import { size,boardPlacement } from "../rowz.plugin";
import walnut from "./American_walnut_pxr128_jpg.jpg"

const { multiplier,dimensions } = size

// const cubeWidth = 300;
const cubeWidth = dimensions*1.3
const cubeHeight = 25;

const Rotate = keyframes`
from {
  transform: rotateY(0deg);
}
to {
  transform: rotateY(360deg);
}
`;

// const Rotate = keyframes`

//   @-webkit-keyframes rotate {
//     0% {
//       -webkit-transform: rotateY(0);
//     }
//     100% {
//       -webkit-transform: rotateY(360deg);
//     }

//   }

//   0% { height: 100px; width: 100px; }
//  30% { height: 400px; width: 400px; opacity: 1 }
//  40% { height: 405px; width: 405px; opacity: 0.3; }
//  100% { height: 100px; width: 100px; opacity: 0.6; }
// `

export const CubeContainer = styled.div`
  width: ${cubeWidth}px;
  height: ${cubeHeight}px;
  top: 300px;
  left: 100px;
  background-color: yellow;
//   position: absolute;
position:relative;
  -webkit-perspective: 1600px;
  -webkit-perspective-origin: 50% -240px;

   /* transform: rotateZ(-20deg);  */
       /* animation-name: ${Rotate};
  animation-duration: 8s;
  animation-iteration-count: infinite; */
`;

// figure {
//   /* left:300px; */
//   display: block;
//   position: absolute;
//   width: 300px;
//   height: 100px;
//   /* border-radius: 50px; */
// background-color: #60c2ef;
//   /* -webkit-transform-origin: 50% 50% 0; */
// }

export const Cube = styled.div`
  -webkit-transform-style: preserve-3d;
  margin:auto;
//   margin-top:50%;
//   left:400px;
//   top:150px;
//   animation: ${Rotate} 2s linear infinite;
//   transform: rotateY(${({ rotation }) => rotation}deg);  
//   transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);  

  transform:
  rotateX(-50deg)
  rotateY(${({ yRotation }) => yRotation}deg)
  rotateZ(0deg)
  ; 

  transition: all 1000ms;
//   transform-origin: 50% 50% 0;
  width:${cubeWidth}px;
  height:${cubeHeight}px;
  background-color:blue;

      /* animation-name: ${Rotate};
  animation-duration: 8s;
  animation-iteration-count: infinite; */

  figure {
            /* animation-name: ${Rotate};
        animation-duration: 8s;
        animation-iteration-count: infinite; */
    
        /* left:300px; */
        display: block;
        position: absolute;
        width: ${cubeWidth}px;

        // background-size: contain;
        // background:url(${walnut}); 
        // background-color: pink;
        // background-color: rgb(240, 240, 240);
        border: 0.1px solid #555;




        // opacity:.5;
        left:-41px;
        top:-18px;
        /* -webkit-transform-origin: 50% 50% 0; */
        /* transform-origin: 50% 50%; */
        /* transform: rotateX(10deg);  */
    
  }

`;

// figure {
//   border: 0.1px solid #fff;
//   -webkit-transform-origin: 50% 50% 0;
// }

const tableEdge = styled.figure`
    background-size: contain;
    background:url(${walnut}); 
`

export const Front = styled(tableEdge)`
  height: ${cubeHeight}px;
// height:100px;
  background-color: yellow;
  -webkit-transform: translateZ(${cubeWidth/2}px);
`;
// .front {
//   -webkit-transform: translateZ(150px);
// }

export const Back = styled(tableEdge)`
  height: ${cubeHeight}px;
  background-color: pink;
  -webkit-transform: rotateY(180deg) translateZ(${cubeWidth / 2}px);
`;

// .back {
//   -webkit-transform: rotateY(180deg) translateZ(150px);
// }

export const Top = styled(tableEdge)`
-webkit-transform-style: preserve-3d;

  /* width:100px; */
  background-color: green;
  height: ${cubeWidth}px;

//   width: 280px;
//   height: 50px;
//   background-size: contain;
//   background:url(${walnut}); 
  
//   top:125px;
  -webkit-transform: rotateX(90deg) translateZ(228px);
`;
// .top {
//   -webkit-transform: rotateX(90deg) translateZ(150px);
// }

export const Bottom = styled(tableEdge)`
  height: ${cubeWidth}px;
  width: ${cubeWidth}px;
  -webkit-transform: rotateX(-90deg) translateZ(${-200}px);
  -webkit-box-shadow: 0 10px 100px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0);
`;
// .bottom {
//   -webkit-transform: rotateX(-90deg) translateZ(150px);
// }

export const Left = styled(tableEdge)`
  background-color: purple;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(-90deg) translateZ(230px);
`;
// .left {
//   -webkit-transform: rotateY(-90deg) translateZ(150px);
// }

export const Right = styled(tableEdge)`
  background-color: orange;
  height: ${cubeHeight}px;
  -webkit-transform: rotateY(90deg) translateZ(230px);
`;
// .right {
//   -webkit-transform: rotateY(90deg) translateZ(150px);
// }
