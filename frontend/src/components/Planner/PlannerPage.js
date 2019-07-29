import React from 'react';
import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import Calendar from './CalendarView';
import PlannerModals from './PlannerModals';
import { classList } from '../helper';

import './PlannerPage.css';

class PlannerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      showAddEventModal: false
    }

    this.toggleAddEventModal = this.toggleAddEventModal.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  toggleAddEventModal() {
    this.setState({
      showAddEventModal: !this.state.showAddEventModal
    });
  }

  getEvents(code) {
    Axios.get('http://localhost:5000/getEvents/' + code).then((res) => {
      let allEvents = [];
      console.log(res.data)
      for (var i in res.data) {
        var event = res.data[i];
        allEvents.push({
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          allDay: false
        })
      }
      console.log(allEvents);
      this.setState({
        loaded: true,
        events: allEvents
      });
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  render() {
    if (this.props.calendarCode !== '' && !this.state.loaded) {
      this.getEvents(this.props.calendarCode);
    }

    return (
      <div className={classList('planner', this.props.showLandingPage && 'blurred')}>
        <Header userData={this.props.userData} toggleLanding={this.props.toggleLanding} />
        <Container fluid>
          <Row>
            <Col lg={2}>
              <Sidebar code={this.props.calendarCode} toggleAddEventModal={this.toggleAddEventModal} />
            </Col>
            <Col lg={10}>
              <Calendar events={this.state.events} code={this.props.calendarCode} />
            </Col>
          </Row>
        </Container>
        <PlannerModals
          code={this.props.calendarCode}
          showAddEventModal={this.state.showAddEventModal}
          toggleAddEventModal={this.toggleAddEventModal}
          getEvents={this.getEvents}
        />
      </div>
    )
  }
}

export default PlannerPage;
