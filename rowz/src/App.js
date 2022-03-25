// import logo from './logo.svg';
// const sass = require('sass');
import { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import CheckerBoard from './Components/checkers/CheckerBoard';
import Crown from './Components/checkers/Tile/Crown/Crown';

function App() {

  const [playCheckers, setPlayCheckers] = useState(true)

  const tic = 'tic-tac-toe'
  const check = 'checkers'

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      {/* <Home /> */}
    {/* <Crown /> */}
      {playCheckers === true ? <CheckerBoard /> : <Home />}
      {playCheckers === false ? <div className='choose-button' onClick={() => setPlayCheckers(!playCheckers)} ><h4 className='App-h4' >play {check}</h4></div> :  <div className='choose-button-checkers' onClick={() => setPlayCheckers(!playCheckers)} ><h4 className='App-h4' >play {tic}</h4></div>}

      {/* <div className={`choose-button ${playCheckers ? true : 'choose-botton-checkers'}`}><h4 className='App-h4' >play {check}</h4></div> */}
    </div>
  );
}

export default App;
