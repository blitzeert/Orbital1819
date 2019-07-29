import React from 'react';

import AddEventModal from './AddEventModal';

class PlannerModals extends React.Component {
  render() {
    return (
      <div className="planner-modals">
        <AddEventModal
          show={this.props.showAddEventModal}
          toggleShow={this.props.toggleAddEventModal}
        />
      </div>
    );
  }
}

export default PlannerModals;