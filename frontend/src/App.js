import React from 'react';

import LandingPage from './components/Landing/LandingPage';
import PlannerPage from './components/Planner/PlannerPage';

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLandingPage: true,
      lastViewedCalendarCode: ''
    };

    this.toggleLanding = this.toggleLanding.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('lastViewedCalendarCode') == null) {
      localStorage.setItem('lastViewedCalendarCode', '');
    }

    let lastViewedCalendarCode = localStorage.getItem('lastViewedCalendarCode');

    this.setState({
      showLandingPage: lastViewedCalendarCode === '',
      lastViewedCalendarCode: lastViewedCalendarCode
    });
  }

  toggleLanding() {
    this.setState({
      showLandingPage: !this.state.showLandingPage
    });
  }

  render() {
    return (
      <div className="App">
        <LandingPage
          showLandingPage={this.state.showLandingPage}
          toggleLanding={this.toggleLanding}
        />

        <PlannerPage
          lastViewedCalendarCode={this.state.lastViewedCalendarCode}
          toggleLanding={this.toggleLanding}
        />
      </div>
    );
  }
}

export default App;
