import styled from 'styled-components'
import { colors,size,menuStyling,openMenu } from '../../rowz.plugin'
const { baseColor } = colors
const { multiplier } = size

export const CheckerMenu = styled.header`
    position:absolute;
    height: ${50 * multiplier}px;
    width: ${350 * multiplier}px;
    left:100px;
    display:flex;
    justify-content:center;
    z-index:10;
    // transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg); 
    // transform: rotateZ(-20deg); 
    
    button {
        margin:5px;
    }
    
    ${openMenu}
`

export const ConfirmNewGame = styled.div`


    background-color:${baseColor};
    z-index:100000;
    border-radius:2px;
    box-shadow:10px 5px 60px 10px rgba(36, 36, 36, 1);

    button {
        z-index:1;
    }

    ${menuStyling}
    
    // position:absolute;
    // height:100px;
    // width:100px;
    // background-color:${baseColor};
    // z-index:100000;
    // border-radius:2px;
    // box-shadow:10px 5px 60px 10px rgba(36, 36, 36, 1);

    // button {
    //     z-index:1;
    // }
`