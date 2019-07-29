import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import Calendar from './CalendarView';
import PlannerModals from './PlannerModals';

import './PlannerPage.css';

class PlannerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      code: props.lastViewedCalendarCode,

      showAddEventModal: false
    }

    this.toggleAddEventModal = this.toggleAddEventModal.bind(this);
  }

  toggleAddEventModal() {
    console.log('clicked');
    this.setState({
      showAddEventModal: !this.state.showAddEventModal
    });
  }

  render() {
    return (
      <div className="planner">
        <Header toggleLanding={this.props.toggleLanding} />
        <Container fluid>
          <Row>
            <Col lg={2}>
              <Sidebar toggleAddEventModal={this.toggleAddEventModal} />
            </Col>
            <Col lg={10}>
              <Calendar code={this.state.code} />
            </Col>
          </Row>
        </Container>
        <PlannerModals
          showAddEventModal={this.state.showAddEventModal}
          toggleAddEventModal={this.toggleAddEventModal}
        />
      </div>
    )
  }
}

export default PlannerPage;
