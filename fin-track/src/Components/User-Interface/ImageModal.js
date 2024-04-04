import React from "react";
import { Modal } from "react-bootstrap";

// ImageModal component displays an image in a modal dialog
const ImageModal = ({ imageUrl, onClose }) => {
  return (
    // Modal component from react-bootstrap, shows when 'show' is true
    <Modal show={true} onHide={onClose} centered size="md">
      <Modal.Body>
        {/* Display image if imageUrl is provided, otherwise display message */}
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
        {/* Close button */}
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal; // Export ImageModal component
