import { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import CheckerBoard from './Components/checkers/CheckerBoard/CheckerBoard';

function App() {

  const [state,setState] = useState({
    playOnline:true,
    playCheckers:true
  })

  const { playCheckers,playOnline } = state

  const handleCheck = () => {
    setState({...state,playOnline:!playOnline})
  }

  const tic = 'tic-tac-toe'
  const check = 'checkers'

  return (
    <div className="App">

      <label>
        <input type="checkbox"
          checked={playOnline}
          onChange={handleCheck}
        />
        Play Online?
      </label>

      {playCheckers === true ? <CheckerBoard playOnline={playOnline} /> : <Home />}

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
