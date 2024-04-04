import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ show, imageUrl, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="md">
      <Modal.Body>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="TransactionImage"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p>No receipt/proof attached</p>
        )}
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
