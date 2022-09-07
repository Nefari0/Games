import styled from 'styled-components'

export const TurnIndicator = styled.main`
    position: absolute;
    top: 390px;
    color: #555;
    z-index: 100000;
    height: 50px;
    width: 180px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    background: rgba(165, 165, 165, 0.116);
    box-shadow: 5px 5px 20px -7px #000000;
    backdrop-filter: blur(12px);
    border-radius: 10px;
`
export const TurnIndicatorText = styled.i`
    margin-left: 50px;
    font-weight: 800;
    font-family: 'Poppins', sans-serif;
    opacity: .6;
`
