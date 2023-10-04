import React from "react";
import Card from './Card.js'
import { currentUserContext } from '../contexts/CurrentUserContext.js'
function Main(props) {
  const currentUserData = React.useContext(currentUserContext);
  return (
    <>
    {props.children}
    <main className="content">
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать аватар профиля"
        >
          <img className="profile__avatar" alt="Аватар профиля" src={currentUserData.avatar} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserData.name}</h1>
          <p className="profile__job">{currentUserData.about}</p>
          <button
            onClick={props.onEditProfile}
            type="button"
            aria-label="Редактировать профиль"
            className="profile__button"
          />
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button" />
      </section>
      <section>
        {/*Контейнер*/}
        <ul className="elements">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} cards={props.cards} onCardClick={props.onCardClick} handleDeleteClick={props.onCardDelete} handleLikeClick={props.onCardLike} setArray={props.setCardsArray}/>
          ))}
        </ul>
      </section>
    </main>
    </>
  );
}
export default Main;