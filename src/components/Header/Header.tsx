import React from "react";
import { Link } from "react-router-dom";

import SearchBox from "../SearchBox/SearchBox";

import "./Header.css";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = props => {
  return (
    <header className="app-header">
      <div className="wrapper">
        <div className="header-flex">
          <Link className="logo" to="/">
            FaceList
          </Link>
          <SearchBox />

          <button className="btn app-header__signin">Войти</button>
          {/* <Link to="/signup">Регистрация</Link> */}
          {/* <Link to="/create">Создать резюме</Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
