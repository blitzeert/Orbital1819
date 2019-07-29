import React from 'react';

import CreateCalendarModal from './CreateCalendarModal';

class LandingModals extends React.Component {
  render() {
    return (
      <div className="landing-modals">
        <CreateCalendarModal
          show={this.props.showCreateCalendarModal}
          toggleShow={this.props.toggleCreateCalendarModal}
        />
      </div>
    );
  }
}

export default LandingModals;