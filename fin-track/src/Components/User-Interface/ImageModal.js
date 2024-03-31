import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered size="md">
      <Modal.Body>
        <img
          src={imageUrl}
          alt="TransactionImage"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
