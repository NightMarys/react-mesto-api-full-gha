import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    const { onClose, onCardDelete } = props;
    e.preventDefault();
    onCardDelete(props.isOpen);
  }

  return (
    <PopupWithForm
      name="delete "
      title="Вы уверены?"
      buttonName={"Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
