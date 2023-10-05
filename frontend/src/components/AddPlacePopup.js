import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { onClose, onAddPlace } = props;
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={"Создать"}
      children={
        <>
          <input
            id="place-input"
            type="text"
            className="popup__input popup__input_el_place"
            placeholder="Название"
            name="name"
            required
            minLength="2"
            maxLength="30"
            value={name || ""}
            onChange={handleChangeName}
          />
          <span className="popup__input-error place-input-error"></span>
          <input
            id="url-input"
            type="url"
            className="popup__input popup__input_el_url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            value={link || ""}
            onChange={handleChangeLink}
          />
          <span className="popup__input-error url-input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
