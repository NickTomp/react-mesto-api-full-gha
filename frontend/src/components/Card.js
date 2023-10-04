import { currentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react'
function Card(props) {
  const currentUserData = React.useContext(currentUserContext);
  const isOwn = props.card.owner._id === currentUserData._id;
  const isLiked = props.card.likes.some(i => i._id === currentUserData._id);
  const cardLikeButtonClassName = ( 
    `elements__like-button ${isLiked && 'elements__like-button_active'}` 
  );; 
  function handleClick() {
    props.onCardClick(props.card);
  }  
  function handleDeleteClick() {
    props.handleDeleteClick(props.card, props.cards, props.setArray)
  } 
  function handleLikeClick() {
    props.handleLikeClick(props.card, props.setArray)
  }
  return (
    <li className="elements__element">
      {isOwn && <button className='elements__delete-button' onClick={handleDeleteClick} />}
      <img className="elements__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="elements__info">
        <h2 className="elements__text">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="elements__counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;