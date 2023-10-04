import React from 'react'
import { Link, useNavigate} from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonText, setButtonText] = React.useState(props.buttonText);
  function handleSetEmail() {
    setEmail(emailRef.current.value)
  }
  function handleSetPassword() {
    setPassword(passwordRef.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Выполняется вход...')
    props.onSubmit(password, email);
    setTimeout(() => {
      setButtonText(props.buttonText)
      if (emailRef.current !== null)
      {emailRef.current.value = '';
      passwordRef.current.value = '';}
    }, 1000);
  }

  return (
    <>
    {props.children}
    <form className="login__form" name={props.name} noValidate="" onSubmit={handleSubmit}>
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
        {buttonText}
      </button>
      <p className='login__caption'>Ещё не зарегистрированы? <Link to="/sign-up" className='login__caption-link'>Регистрация</Link>  </p>
    </form>
    </>
  );
}
export default Login;