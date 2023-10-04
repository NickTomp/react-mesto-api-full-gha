import React from 'react'
import PopupWithForm from './PopupWithForm.js';
function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const [link, setLink] = React.useState('');
  function handleSetLink() {
    setLink(avatarRef.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }
  React.useEffect(() => {
    avatarRef.current.value = '';
}, [props.isOpen]);
  return (
    <PopupWithForm name={'avatar'} title={'Обновить аватар'} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'} buttonClassName={'popup__submit-button popup__submit-button_type_avatar'}>
      <input
        ref={avatarRef}
        type="url"
        id="avatar-link-input"
        name="link"
        required=""
        placeholder="Ссылка на аватар"
        className="popup__text-input popup__text-input_type_avatar"
        defaultValue={link}
        onChange={handleSetLink}
      />
      <span className="avatar-link-input-error popup__input-error">
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;