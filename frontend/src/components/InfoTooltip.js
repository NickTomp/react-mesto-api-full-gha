import React from 'react'
import deny from '../images/deny.svg'
import success from '../images/success.svg'
function InfoTooltip(props) {
  const infoText = props.state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз';
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={`${props.name}-popup`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть поп-ап"
        />
        <img className='info__image' src={props.state ? success : deny} ></img>
        <p className='info__caption'>{infoText}</p>
      </div>
    </div>
  );
}
export default InfoTooltip;