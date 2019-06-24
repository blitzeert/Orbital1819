import React from 'react';
import logo from './logo.svg';
import './App.css';
import background from './background.png'

import Header from './components/Header'
import TempContent from './components/TempContent'
import Timeline from './components/TimelinePage/TimelineMain'

function App() {
  return (
    <div className="App">
      <div style={{height: "20px"}}>
      <Header />
      </div>
      <div>
      <Timeline />
      </div>
    </div>

  );
}

export default App;

/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/
