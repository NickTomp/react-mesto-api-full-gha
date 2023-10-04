function Header(props) {
  const redirect = props.buttonClick
  function  handleClick() {
    redirect(props.path)
  }
  return (
      <header className="header">
        <img className='header__logo' alt='mesto' src={props.logo} />
        <p className='header__email'>{props.email}</p>
        <button className='header__button' onClick={handleClick}>{props.buttonText}</button>
      </header>
  );
}
export default Header;