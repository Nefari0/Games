import { useState } from 'react';
import { connect } from 'react-redux';
import { updateNotice,updateAlert } from './redux/globalReducer';
import './App.css';
import Nav from './Components/Nav/nav.component';
import { AppContainer,Header } from './App.styles';
import GameBoard from './Components/Platform/platform.component';
import { OverLay } from './Components/Styles/global.styles';
import Alert from './Components/Notice/notice.component';

// const { multiplier } = size

function App(props) {

  const [state,setState] = useState({
    playCheckers:true,
    yRotation: 0,
    xRotation: 0,
  })

  const {notice,alert} = props.globalReducer
  // const { playCheckers,xRotation,yRotation } = state

  const tic = 'tic-tac-toe'
  const check = 'checkers'
  const currentGame = 123456789

  return (
    <AppContainer>
      <Header>
        <Nav />
        <h1>Rowz</h1>
      </Header>
      <OverLay>
        <Alert/>
      </OverLay>

        <GameBoard state={state}/>

      {/* CONTROLS ROTATION OF BOARD FOR DEVELOPEMENT */}
      {/* <div 
        style={{
          position:'absolute',
          top:'0px'
        }}
      >
        <button onClick={() => stateManager('yRotation',yRotation+90)}>prev</button>
        <button onClick={() => stateManager('yRotation',yRotation-90)}>next</button>
      </div> */}
    </AppContainer>
  );
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, {updateNotice,updateAlert})(App)
