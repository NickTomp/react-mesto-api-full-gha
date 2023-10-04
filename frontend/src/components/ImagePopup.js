function ImagePopup(props) {
  return (
    <div className={props.card.link === '' ? 'popup popup_type_view' : 'popup popup_type_view popup_opened'} id="view-popup">
      <div className="popup__container popup__container_type_view">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть поп-ап"
        />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;