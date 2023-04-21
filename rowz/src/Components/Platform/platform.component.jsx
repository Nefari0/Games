import {
    CubeContainer,
    Cube,
    Front,
    Back,
    Top,
    Bottom,
    Left,
    Right
  } from "./platform.styles";
  import CheckerBoard from "../Rows/CheckerBoard/CheckerBoard";
//   import { GoodPlayer } from "./peice.styles";
  
  const GameBoard = ({ state }) => {
    const { yRotation, xRotation, currentIndex } = state;
    console.log("CURRENT IN LOWER GAME COMPOENT", xRotation);
  
    return (
      <CubeContainer>
        <Cube xRotatuin={xRotation} yRotation={yRotation}>
            <Top>
                {/* top */}
                <CheckerBoard />
            </Top>
            <Bottom></Bottom>

            <Left>
                {/* left */}
            </Left>

            <Front>
                {/* front */}
            </Front>

            <Right>
                {/* right */}
            </Right>

            {/* <figure></figure> */}
            <Back>
                {/* back */}
            </Back>
        </Cube>
      </CubeContainer>
    );
  };
  
  export default GameBoard;
  