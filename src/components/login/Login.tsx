import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { login } from "../../actions/userActions";
import { LoginCredentials } from "../../actions/types";

import "./Login.css";

interface LoginProps {
  loading: boolean;
  message: string;
  login: (credentials: LoginCredentials, callback: () => void) => void;
}

interface LoginState {
  email: string;
  password: string;
}

const Login: React.FunctionComponent<LoginProps> = props => {
  const initialState: LoginState = { email: "", password: "" };
  const [credentials, setCredentials] = useState<LoginState>(initialState);

  const changeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const submitHendler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.login(credentials, () =>
      setCredentials({ ...credentials, password: "" }),
    );
  };

  const isValid = Boolean(credentials.email && credentials.password);

  return (
    <div className="header-login">
      <Link className="reg-link" to="/signup">
        Регистрация
      </Link>
      <span className="login-error">{props.message}</span>
      <form className="login-form" onSubmit={submitHendler}>
        <input
          type="text"
          name="email"
          className="login"
          onChange={changeHandler}
          value={credentials.email}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="password"
          onChange={changeHandler}
          value={credentials.password}
          placeholder="Пароль"
        />
        <button
          className="btn login-btn"
          onClick={submitHendler}
          disabled={!isValid}
        >
          {props.loading ? "..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    loading: state.user.loading,
    message: state.user.message,
  }),
  { login },
)(Login);
