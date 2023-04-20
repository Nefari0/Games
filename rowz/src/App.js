import { useState } from 'react';
import './App.css';
import TicTacToe from './Components/TicTacToe/tictactoe.component';
import CheckerBoard from './Components/Rows/CheckerBoard/CheckerBoard'
import Nav from './Components/Nav/nav.component';
import { size } from './Components/rowz.plugin'
import { AppContainer,Adapter,Header,BaseButton } from './App.styles';

const { multiplier } = size

function App() {

  const [state,setState] = useState({
    playCheckers:true
  })

  const { playCheckers } = state

  const tic = 'tic-tac-toe'
  const check = 'checkers'
  const currentGame = 123456789

  return (
    <AppContainer>
      <Header>
        <Nav />
        <h1>Rowz</h1>
      </Header>
      <Adapter>

        {playCheckers === true ? <CheckerBoard currentGame={currentGame} /> : <TicTacToe />}

        <BaseButton
          onClick={() => {setState({...state, playCheckers:!playCheckers})}}
        >
          play {!playCheckers ? check : tic}
        </BaseButton>

      </Adapter>
    </AppContainer>
  );
}

export default App;
