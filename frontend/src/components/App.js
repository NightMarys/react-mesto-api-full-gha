import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../index.css";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipSuccessPopupOpen, setInfoTooltipSuccessPopupOpen] =
    React.useState(false);
  const [isInfoTooltipFailPopupOpen, setInfoTooltipFailPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerBtnText, setHeaderBtnText] = React.useState("Регистрация");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPass, setUserPass] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getInitialCards()
      .then((serverCards) => {
        setCards(serverCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getToken(token)
        .then((data) => {
          if (data) {
            setUserEmail(data.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err === 400) {
            console.log("Токен не передан или передан не в том формате");
          }
          if (err === 401) {
            console.log("Переданный токен некорректен");
          }
        });
    }
  }, [navigate, loggedIn]);


  function handleLogIn(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        if (err === 400) {
          console.log("не передано одно из полей");
        }
        if (err === 401) {
          console.log("пользователь с email не найден");
        }
      });
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoTooltipSuccessPopupOpen(true);
        setUserEmail(email);
        setUserPass(password);
        navigate("/signin");
      })
      .catch((err) => {
        setInfoTooltipFailPopupOpen(true);
        if (err === 400) {
          console.log("некорректно заполнено одно из полей");
        }
      });
  }

  const location = useLocation();

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setUserPass("");
    setLoggedIn(false);
  }

  function handleTogglePage() {
    if (location.pathname === "/signin") {
      navigate("/signup");
      setHeaderBtnText("Вход");
      return;
    }
    navigate("/signin");
    setHeaderBtnText("Регистрация");
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setInfoTooltipSuccessPopupOpen(false);
    setInfoTooltipFailPopupOpen(false);
  };

  function handleUpdateUser(userData) {
    api
      .patchUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api
      .patchAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(cardData) {
    api
      .postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsDeletePopupOpen(card);
  }

  function handleSubmitDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        setIsDeletePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            btnText={headerBtnText}
            onTogglePage={handleTogglePage}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegistration} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogIn} />}
            />
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleSubmitDeleteCard}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipSuccessPopupOpen}
            onClose={closeAllPopups}
            image={true}
            text={"Вы успешно зарегистрировались!"}
          />
          <InfoTooltip
            isOpen={isInfoTooltipFailPopupOpen}
            onClose={closeAllPopups}
            image={false}
            text={"Что-то пошло не так! Попробуйте ещё раз."}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
