import React from 'react'
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

import './LandingMenu.css';

class LandingMenu extends React.Component {
  render() {
    return (
      <Container fluid="true" className="landing-menu">
        <Row className="hello justify-content-center align-items-center mb-5">
          <Col lg={3} className="text-center">
            <p style={{ fontSize: 24 }}>Hello!</p>
          </Col>
        </Row>

        <Row className="menu justify-content-center mb-5">
          <Col lg={3} className="calendars right-border">
            <Row className="align-items-center flex-column pr-3">
              <Col lg={8} className="text-center">
                <p className="my-2">Your Calendars:</p>
              </Col>

              {/* This will be automated in a load function */}

            </Row>
          </Col>
          <Col lg={3} className="options left-border">
            <Row className="flex-column align-items-center pl-3">
              <Col lg={8} className="text-center">
                <p className="my-2">Add calendars:</p>
              </Col>
              <Col lg={8} className="text-center">
                <Button variant="outline-dark" className="my-2" onClick={this.props.showCreateCalendarModal}>Create New Calendar</Button>
              </Col>
              <Col lg={12} className="text-center">
                <InputGroup className="my-2">
                  <FormControl
                    placeholder="Calendar invite link"
                    aria-label="Calendar invite link"
                  />
                  <InputGroup.Append>
                    <Button variant="outline-dark" onClick={this.loadCalendar}>Import Calendar</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="hide justify-content-center">
          <Col lg="auto">
            <Button variant="outline-primary" onClick={this.props.toggleLanding}>Hide Landing Page</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LandingMenu;