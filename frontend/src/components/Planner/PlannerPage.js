import React from 'react';
import Axios from 'axios';
import moment from 'moment'
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
      showAddEventModal: false,
      showItemDescModal: false,
      showItem: {},
    }

    this.toggleAddEventModal = this.toggleAddEventModal.bind(this);
    this.handleShowItemDesc = this.handleShowItemDesc.bind(this);
    this.toggleItemDescModal = this.toggleItemDescModal.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  toggleAddEventModal() {
    this.setState({
      showAddEventModal: !this.state.showAddEventModal
    });
  }

  toggleItemDescModal() {
    this.setState({
      showItemDescModal: !this.state.showItemDescModal
    });
  }

  handleShowItemDesc(itemId) {
    console.group("handle show item Desc")
    var item = this.state.events.filter((x) => parseInt(x.id) === parseInt(itemId))
    console.log("item", item)
    if (item.length === 1) {
      this.setState({showItem: item[0]}, () => {
        this.toggleItemDescModal()
      })
    }
    console.groupEnd()
  }

  getEvents(code) {
    Axios.get('http://localhost:5000/getEvents/' + code).then((res) => {
      let allEvents = [];
      console.log(res.data)
      for (var i in res.data) {
        var event = res.data[i];
        allEvents.push({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          comment: event.comment,
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

  handleResize(event) {
    console.group('resize');
    const events = this.state.events;
    console.log("events:", events, "event:", event)
    
		var data = events.map(curr =>
      parseInt(curr.id) === parseInt(event.id)
          ? Object.assign({}, curr, {
              id: event.id,
              title: event.title,
              start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
              end: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
            })
          : curr
      );
    console.log("data:", data)
    const finalData = {events: data}
    Axios.post('http://localhost:5000/updateEvent/' + this.props.calendarCode + '/' + JSON.stringify(finalData))
        .then((res) => {
          console.log('success');
          this.getEvents(this.props.calendarCode);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    console.groupEnd()
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
              <Calendar events={this.state.events} code={this.props.calendarCode} handleResize={this.handleResize} handleShowItemDesc={this.handleShowItemDesc} />
            </Col>
          </Row>
        </Container>
        <PlannerModals
          code={this.props.calendarCode}
          showAddEventModal={this.state.showAddEventModal}
          toggleAddEventModal={this.toggleAddEventModal}
          getEvents={this.getEvents}

          showItemDescModal={this.state.showItemDescModal}
          toggleItemDescModal={this.toggleItemDescModal}
          item={this.state.showItem}
        />
      </div>
    )
  }
}

export default PlannerPage;
