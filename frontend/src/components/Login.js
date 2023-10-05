import React from "react";

function Login(props) {
  const { handleLogin } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(password, email);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="30"
          value={email || ""}
          onChange={handleEmail}
        />
        <input
          type="password"
          className="auth__input"
          id="password-input"
          name="password"
          placeholder="Пароль"
          required
          value={password || ""}
          onChange={handlePassword}
          minLength="6"
        />
        <button type="submit" className="auth__save-btn">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
