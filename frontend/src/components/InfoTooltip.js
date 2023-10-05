import React from "react";
import success from "../images/Success.svg";
import fail from "../images/Fail.svg";

function InfoTooltip(props) {
  const { image, text, isOpen, onClose } = props;

  return (
    <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="reset"
          onClick={onClose}
        ></button>
        <div
          className="popup__icon"
          style={{ backgroundImage: `url(${image ? success : fail})` }}
        ></div>
        <p className="popup__text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
