import React from "react";
import Modal from "react-bootstrap/Modal";
import About from "../../About/About";

function AboutModal({ handleAboutClose, showAbout }) {
  return (
    <Modal
      show={showAbout}
      onHide={handleAboutClose}
      dialogClassName="modalStyle"
    >
      <About />
    </Modal>
  );
}

export default AboutModal;
