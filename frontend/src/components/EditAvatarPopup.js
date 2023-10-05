import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { onClose, onUpdateAvatar } = props;
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={"Сохранить"}
      children={
        <>
          <input
            id="avatar-input"
            type="url"
            className="popup__input popup__input_el_avatar"
            placeholder="Ссылка на аватар"
            name="avatar"
            required
            ref={inputRef}
          />
          <span className="popup__input-error avatar-input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
