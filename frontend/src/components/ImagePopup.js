import React from "react";

function ImagePopup(props) {
  const { card, isOpen, onClose } = props;

  return (
    <div
      className={`popup popup_type_view-image ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__image-container">
        <button
          className="popup__close-btn"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__photo-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
