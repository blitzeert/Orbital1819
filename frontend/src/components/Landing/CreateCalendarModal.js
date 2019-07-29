import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class CreateCalendarModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggleShow} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Create new calendar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Test</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button>Create</Button>
          <Button onClick={this.props.toggleShow}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateCalendarModal;