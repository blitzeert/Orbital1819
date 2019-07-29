import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

// import Suggestions from './Suggestions';

class Sidebar extends React.Component {
  render() {
    return (
      <Row className="sidebar flex-column align-items-center">
        <Col className="mb-2 text-center">
          <Button variant="outline-primary" onClick={this.props.toggleAddEventModal}>Add new event</Button>
        </Col>
        <Col>
          <hr></hr>
        </Col>
        <Col className="text-center">
          <h6>Suggestions for you</h6>
        </Col>
        <Col className="my-2 text-center">
          <Button variant="outline-primary">Add new event</Button>
        </Col>
        <Col className="my-2 text-center">
          <Button variant="outline-primary">Add new event</Button>
        </Col>
        <Col className="my-2 text-center">
          <Button variant="outline-primary">Add new event</Button>
        </Col>
        <Col className="my-2 text-center">
          <Button variant="outline-primary">Add new event</Button>
        </Col>
      </Row>
    );
  }
}

export default Sidebar;