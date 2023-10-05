import React from "react";

function PopupWithForm(props) {
  const { name, title, children, isOpen, onClose, buttonName, onSubmit } =
    props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="reset"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-btn" type="submit">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
