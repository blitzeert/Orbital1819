import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import TimelineContainer from './components/Timeline/TimelineContainer'
import NotFound from './components/Routes/NotFound'

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/newTimeline" component={TimelineContainer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default AppRoutes