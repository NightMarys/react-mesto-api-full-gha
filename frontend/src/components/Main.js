import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const {
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__descrition">
          <button
            className="profile__avatar-edit-button profile__avatar-edit-button_popup_opened"
            onClick={onEditAvatar}
            type="button"
          >
            <img src={currentUser.avatar} className="profile__image" />
          </button>
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
            <button
              className="profile__edit-button profile__edit-button_popup_opened"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section aria-label="Фотоэлементы" className="elements">
        <ul className="elements__group">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
