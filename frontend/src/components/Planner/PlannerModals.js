import React from 'react';

import AddEventModal from './AddEventModal';

class PlannerModals extends React.Component {
  render() {
    return (
      <div className="planner-modals">
        <AddEventModal
          code={this.props.code}
          show={this.props.showAddEventModal}
          toggleShow={this.props.toggleAddEventModal}
          getEvents={this.props.getEvents}
        />
      </div>
    );
  }
}

export default PlannerModals;