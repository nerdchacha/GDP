import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BsModal, Button } from 'react-bootstrap';

function Modal ({ show, title, body, onCancel, onConfirm }) {
  return (
    <BsModal show={show} onHide={onCancel}>
      <BsModal.Header closeButton>
        <BsModal.Title>{title}</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{body}</BsModal.Body>
      <BsModal.Footer>
        <Button onClick={onCancel}>Close</Button>
        <Button bsStyle="primary" onClick={onConfirm}>Confirm</Button>
      </BsModal.Footer>
    </BsModal>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;
