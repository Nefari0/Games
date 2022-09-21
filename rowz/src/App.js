import { useState } from 'react';
import './App.css';
import TicTacToe from './Components/TicTacToe/tictactoe.component';
import CheckerBoard from './Components/Rowz/CheckerBoard/CheckerBoard'

function App() {

  const [state,setState] = useState({
    playCheckers:true
  })

  const { playCheckers } = state

  const tic = 'tic-tac-toe'
  const check = 'checkers'
  const currentGame = 123456789

  return (
    <div className="App">

      {playCheckers === true ? <CheckerBoard currentGame={currentGame} /> : <TicTacToe />}

      {
      playCheckers === false ?
      <div className='choose-button' onClick={() => setState({...state,playCheckers:true})} >
        <h4 className='App-h4' >play {check}</h4>
      </div>
      :
      <div className='choose-button-checkers' onClick={() => setState({...state,playCheckers:false})} >
        <h4 className='App-h4' >play {tic}</h4>
      </div>
      }

    </div>
  );
}

export default App;
