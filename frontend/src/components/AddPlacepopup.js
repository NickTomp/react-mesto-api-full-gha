import React from 'react'
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const titleRef = React.useRef();
  const linkRef = React.useRef();
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  function handleSetTitle() {
    setTitle(titleRef.current.value)
  }
  function handleSetLink() {
    setLink(linkRef.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(link, title)
  }
  React.useEffect(() => {
    titleRef.current.value = '';
    linkRef.current.value = '';
}, [props.isOpen]);
  return (
    <PopupWithForm
      name='image'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Создать'
      buttonClassName='popup__submit-button'
      onSubmit={handleSubmit} >
      <input
        ref={titleRef}
        type="text"
        id="title-input"
        name="title"
        required=""
        minLength={2}
        maxLength={30}
        placeholder="Название"
        className="popup__text-input"
        value={title}
        onChange={handleSetTitle}
      />
      <span className="title-input-error popup__input-error">
        Необходимо заполнить данное поле
      </span>
      <input
        ref={linkRef}
        type="url"
        id="link-input"
        name="link"
        required=""
        placeholder="Ссылка на картинку"
        className="popup__text-input"
        defaultValue={link}
        onChange={handleSetLink}
      />
      <span className="link-input-error popup__input-error">
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;