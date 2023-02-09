import { useState } from 'react';
import './App.css';

//SELF IMPORTS
import { Calculator } from './main';
import {AppContext} from './provider';

function App() {

  const [toggleFullScreen, setToggleFullScreen] = useState(false)

  return (
    <>
      <AppContext.Provider value={{toggleFullScreen, setToggleFullScreen}}>
        <div id="wrapper">
          <div id="app" className="App" style={{width: `${toggleFullScreen ? '100%' : '320px'}`}}>
            <Calculator />
          </div>
        </div>
        <button 
          onClick={() => setToggleFullScreen(!toggleFullScreen)} 
          className='float'>
            {toggleFullScreen ? <span>&#8690;</span> : <span>&#8689;</span>}
            <br />
        </button>
      </AppContext.Provider>
    </>
  );
}

export default App;