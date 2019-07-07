import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  //StaticRouter, // for server rendering
  Route,
  Link,
  Switch,
  //hashHistory
  // etc.
} from 'react-router-dom';

import Header from './components/Header'
import Timeline from './components/TimelinePage/TimelineMain'
import TImelineContainer from './components/TimelineContainer'


function App() {
  return ( 
    <Router>
      <div className="App"> 
        <Header />
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/event/:id' component={Timeline} />
          <Route path="/topics" component={Topics} />
          <Route path="/about" component={About} />
          <Route path="/header2" component={Header2} />
          <Route path="/newTimeLine" component={TImelineContainer} />
          <Route component={NotFound} />
          </Switch>
      </div>
    </Router>
   
  );
}
/*
<div className="App">
        <div style={{height: "20px"}}>
        <Header />
        </div>
        <div>
        <Timeline />
        </div>
      </div>
*/
const NotFound = () => (  <h1>404.. This page is not found!</h1>)

export default App;
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Header2() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/event">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}




















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
