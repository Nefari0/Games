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
  import { colors } from '../rowz.plugin';

  const { baseColor,secondaryColor,badPieceDefaultColor,goodPieceDefaultColor } = colors
  
  const GameBoard = ({state,currentPlayer}) => {
    const { yRotation, xRotation, currentIndex } = state;

    const [platformState,setPlatformState] = useState({
      goodPieceColor:`background-color: ${goodPieceDefaultColor};`,
      badPieceColor:`background-color: ${badPieceDefaultColor};`,
      colorPickerOpen:false,
      editItem:'badPieceColor', // Current items that's being edited
    })

    const stateHandler = (prop,val) => {
      setPlatformState({
        ...platformState,
        [prop]:val
      })
    }

  
    return (
      <CubeContainer>
        <Cube xRotatuin={xRotation} yRotation={yRotation}>
            <Top>
                {/* top */}
                <DarkOverLay colorPickerOpen={platformState.colorPickerOpen}>
               <ColorPicker stateHandler={stateHandler} platformState={platformState}/>
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
  