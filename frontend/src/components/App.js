import React from 'react'
import '../index.js';
import Main from './Main.js'
import ImagePopup from './ImagePopup.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacepopup.js'
import PopupWithForm from './PopupWithForm.js';
import api from '../utils/api.js'
import auth from '../utils/auth.js'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js'
import Footer from './Footer.js'
import ProtectedRoute from './ProtectedRoute.js'
import logo from '../images/logo.svg'
import Login from './Login.js';
import Register from './Register.js';
import PageNotFound from './PageNotFound.js'
import InfoTooltip from './InfoTooltip.js'
import { loggedInContext } from '../contexts/AuthContext.js';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
function App() {
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' });
  const [cards, setCardsArray] = React.useState([]);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
  const [infoState, setInfoState] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser({ name: data.name, about: data.about, avatar: data.avatar, _id: data._id })
      })
      .then(() => {
        api.getCardsArray()
          .then((cardsArray) => {
            setCardsArray(cardsArray)
          })
      })
      .catch((err) => alert(`${err} - не удалось загрузить данные`))
  }, [])
  React.useEffect(() => {
    const jwt = localStorage.getItem('token')
    handleValidate(jwt)
  }, [])
  function handleEditAvatarClick() {
    setAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard({ name: '', link: '' })
  }
  function handleCardLike(card, setCards) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => alert(`${err} - не удалось загрузить данные`));
  }
  function handleCardDelete(card, cards, setCards) {
    api.deleteCard(card)
      .then(() => {
        const newArray = cards.filter(item => item._id !== card._id)
        setCards(newArray);
      })
      .catch((err) => alert(`${err} - не удалось удалить карточку`));
  }
  function handleUpdateUser(data) {
    api.editProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert(`${err} - не удалось отредактировать профиль`));
  }
  function handleUpdateAvatar(link) {
    api.editProfileAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert(`${err} - не удалось обновить аватар`));
  }
  function handleAddPlace(link, title) {
    api.addNewCard(link, title)
      .then((newCard) => {
        setCardsArray([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => alert(`${err} - не удалось добавить изображение`));
  }
  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      })
      .then(() => {
        handleValidate(localStorage.getItem('token'))
      })
      .catch((err) => alert(`${err} - не удалось авторизоваться!`));
  }
  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        setInfoToolTipOpen(true);
        setInfoState(true);
      })
      .catch(() => {
        setInfoToolTipOpen(true);
        setInfoState(false);
      });
  }
  function handleValidate(jwt) {
    auth.validate(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(data.data.email);
        navigate('/', {replace: true});
      })
      .catch((err) => alert(`${err} - не удалось авторизоваться, выполните вход!`));
  }
  function logOut() {
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }
  function redirect(path) {
    navigate(`/${path}`, {replace: false})
  }
  return (
    <div className="App">
      <loggedInContext.Provider value={isLoggedIn}>
        <currentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Main/>}
              cards={cards}
              setCardsArray={setCardsArray}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}><Header buttonText={'Выход'} buttonClick={logOut} logo={logo} email={userEmail}/></ProtectedRoute>} />
            <Route path="/sign-in" element={<Login onSubmit={handleLogin} name='login-form' title='Вход' buttonText='Войти'><Header path={'sign-up'} buttonClick={redirect} buttonText={'Регистрация'} logo={logo} /></Login>} />
            <Route path="/sign-up" element={<Register onSubmit={handleRegister} name='register-form' title='Регистрация' buttonText='Зарегистрироваться'><Header path={'sign-in'} buttonClick={redirect} buttonText={'Войти'} logo={logo} /></Register>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
          <InfoTooltip name={'info'} isOpen={isInfoToolTipOpen} state={infoState} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            name={'delete'}
            title={'Вы уверены?'}
            buttonText={'Да'}
            buttonClassName={'popup__submit-button popup__submit-button_type_agree'} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
        </currentUserContext.Provider>
      </loggedInContext.Provider>
    </div>
  )
};
export default App;