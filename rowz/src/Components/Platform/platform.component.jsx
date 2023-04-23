import {connect} from 'react-redux'
import { updatePlayer } from '../../redux/checkerReducer';
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
  import CurrentPlayer from '../Rows/TurnIndicator/current.component';
  import CheckerBoard from "../Rows/CheckerBoard/CheckerBoard";
  
  const GameBoard = ({state,currentPlayer}) => {
    const { yRotation, xRotation, currentIndex } = state;
  
    return (
      <CubeContainer>
        <Cube xRotatuin={xRotation} yRotation={yRotation}>
            <Top>
                {/* top */}
                <CurrentPlayer 
                  currentPlayer={currentPlayer.currentPlayer.currentPlayer}
                />
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

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps, {updatePlayer})(GameBoard)
  
  // export default GameBoard;
  