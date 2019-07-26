import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header'
import Timeline from './components/TimelinePage/TimelineMain'
import TimelineContainer from './components/TimelineContainer'
import LoginPage from './components/LoginPage/LoginMain'
import CreateUserPage from './components/LoginPage/CreateUser'
import Home from './components/Home'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username:""
    }

    this.setUsername = this.setUsername.bind(this)
  }

  setUsername(name) {
    this.setState({
      username: name
    })
  }

  render() {
    return ( 
      <Router>
        <div className="App"> 
          <Header username={this.state.username} setUsername={this.setUsername}/>
            <Switch>
            <Route exact path="/" render={() => <Home username={this.state.username} />} />
            <Route path='/event/:id' render={(props) => <Timeline {...props} username={this.state.username} />} />
            <Route path="/newTimeLine" render={() => <TimelineContainer username={this.state.username} />} />
            <Route path="/login" render={() => <LoginPage setUsername={this.setUsername}/>} />
            <Route path="/createuser" render={() => <CreateUserPage setUsername={this.setUsername} />} />
            <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
  }
  
}
const NotFound = () => (  <h1>404.. This page is not found!</h1>)

export default App;

/*
function Homew() {
  return <h2>Home</h2>;
}
*/