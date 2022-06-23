import * as ReactDOM from "react-dom";
import React from "react";

const Modal = ({ title, children, onCloseClick }) => {
  const onModalClick = (event) => {
    if (event.target === document.querySelector(".modal")) {
      onCloseClick();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-body">{children}</div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
