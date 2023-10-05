import logo from "../images/logo.svg";

function Header(props) {
  const { loggedIn, onSignOut, onTogglePage, userEmail, btnText } = props;

  function handleClick() {
    loggedIn ? onSignOut() : onTogglePage();
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />

      <div className="header__group">
        <h3 className="header__email">{loggedIn && userEmail}</h3>
        <h3 className="header__link" onClick={handleClick}>
          {loggedIn ? "Выйти" : btnText}
        </h3>
      </div>
    </header>
  );
}

export default Header;
