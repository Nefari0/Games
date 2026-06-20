import {connect} from 'react-redux'
import { useState } from 'react';
import { updatePlayer } from '../../redux/checkerReducer';
import { ColorPicker } from '../Rows/ColorPicker/colorpicker.component';
import { DarkOverLay } from '../Rows/ColorPicker/colorpicker.styles';
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

    const [platformState,setPlatformState] = useState({
      goodPieceColor:'background-color: rgb(255 255 128);'
    })

    const stateHandler = (prop,val) => {
      console.log('hitting handler',prop,val)
      setPlatformState({
        ...platformState,
        [prop]:val
      })
    }

  
    return (
      <CubeContainer>
        <Cube xRotatuin={xRotation} yRotation={yRotation}>
            <Top>
               <ColorPicker stateHandler={stateHandler}/>
                {/* top */}
                <DarkOverLay>
                  <CurrentPlayer 
                    currentPlayer={currentPlayer.currentPlayer.currentPlayer}
                  />
                  <CheckerBoard platformState={platformState}/>
                </DarkOverLay>
                 
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
  