import { useState } from 'react';
import './App.css';
import TicTacToe from './Components/TicTacToe/tictactoe.component';
import CheckerBoard from './Components/Rows/CheckerBoard/CheckerBoard'
import Nav from './Components/Nav/nav.component';
import { size } from './Components/rowz.plugin'
import { AppContainer,Header,BaseButton } from './App.styles';
import GameBoard from './Components/Platform/platform.component';
import { NoticeContainer } from './Components/Notice/notice.styles';
import { OverLay } from './Components/Styles/global.styles';

// const { multiplier } = size

function App() {

  const [state,setState] = useState({
    playCheckers:true,
    yRotation: 0,
    xRotation: 0,
  })

  const { playCheckers,xRotation,yRotation } = state

  const tic = 'tic-tac-toe'
  const check = 'checkers'
  const currentGame = 123456789

  const stateManager = (prop,val) => {
    setState({
      ...state,
      [prop]:val
    })
  }

  return (
    <AppContainer>
      <Header>
        <Nav />
        <h1>Rowz</h1>
      </Header>
      <OverLay>

      <NoticeContainer></NoticeContainer>
      </OverLay>
      {/* <Adapter>

        {playCheckers === true ? <CheckerBoard currentGame={currentGame} /> : <TicTacToe />}

        <BaseButton
          onClick={() => {setState({...state, playCheckers:!playCheckers})}}
        >
          play {!playCheckers ? check : tic}
        </BaseButton>

      </Adapter> */}

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

export default App;
