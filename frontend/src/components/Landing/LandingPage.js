import React from 'react';
import './LandingPage.css';

import LandingMenu from './LandingMenu'
import LandingModals from './LandingModals'
import { classList } from '../helper';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreateCalendarModal: false
    };

    this.toggleShowCreateCalendarModal = this.toggleShowCreateCalendarModal.bind(this);
  }

  toggleShowCreateCalendarModal() {
    this.setState({
      showCreateCalendarModal: !this.state.showCreateCalendarModal
    });
  }

  render() {
    return (
      <div className={classList('landing', !this.props.showLandingPage && 'hidden')}>
        <div className="landing-overlay" />
        <LandingMenu
          toggleLanding={this.props.toggleLanding}
          showCreateCalendarModal={this.toggleShowCreateCalendarModal}
        />
        <LandingModals
          showCreateCalendarModal={this.state.showCreateCalendarModal}
          toggleCreateCalendarModal={this.toggleShowCreateCalendarModal}
        />
      </div>
    );
  }
}

export default LandingPage;
