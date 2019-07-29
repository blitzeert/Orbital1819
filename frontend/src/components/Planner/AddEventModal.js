import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class AddEventModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggleShow} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add new event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Test</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button>Add</Button>
          <Button onClick={this.props.toggleShow}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddEventModal;