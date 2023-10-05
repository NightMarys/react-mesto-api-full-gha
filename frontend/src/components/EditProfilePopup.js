import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { onClose, onUpdateUser } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={"Сохранить"}
      children={
        <>
          <input
            id="name-input"
            type="text"
            className="popup__input popup__input_el_name"
            placeholder="Имя"
            name="name"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            value={name || ""}
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            id="job-input"
            type="text"
            className="popup__input popup__input_el_job"
            placeholder="Род деятельности"
            name="about"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
            value={description || ""}
          />
          <span className="popup__input-error job-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
