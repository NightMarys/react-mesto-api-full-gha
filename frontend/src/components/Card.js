import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card } = props;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__icon ${
    isLiked && "element__icon_active"
  }`;

  function handleCardClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          className="element__delete-btn"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
      />
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
