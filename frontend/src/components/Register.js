import React from 'react'
import { Link } from 'react-router-dom';

function Register(props) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function handleSetEmail() {
    setEmail(emailRef.current.value)
  }
  function handleSetPassword() {
    setPassword(passwordRef.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(password, email);
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }
  return (
    <>
    {props.children}
    <form className="login__form" onSubmit={handleSubmit} name={props.name} noValidate="">
      <h2 className="login__header">{props.title}</h2>
      <input
        ref={emailRef}
        type="email"
        id="email-input"
        name="Email"
        required=""
        minLength={2}
        maxLength={50}
        placeholder="Email"
        className="login__input"
        defaultValue={''}
        onChange={handleSetEmail}
      />
      <input
        ref={passwordRef}
        type="password"
        id="password-input"
        name="password"
        required=""
        minLength={8}
        maxLength={50}
        placeholder="Пароль"
        className="login__input"
        defaultValue={''}
        onChange={handleSetPassword}
      />
      <button type="submit" className='login__submit-button'>
        {props.buttonText}
      </button>
      <p className='login__caption'>Уже зарегистрированы? <Link to="/sign-in" className='login__caption-link'>Войти</Link>  </p>
    </form>
    </>
  );
}
export default Register;