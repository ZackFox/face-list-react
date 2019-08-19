import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { AppState } from "../../store";

import SearchBox from "../SearchBox/SearchBox";
import Login from "../login/Login";
import UserBar from "../UserBar/UserBar";

import "./Header.css";

interface HeaderProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = props => {
  return (
    <header className="app-header">
      <div className="wrapper">
        <div className="header-flex">
          <input type="checkbox" id="dummy" className="menu-toggle" />
          <Link className="logo" to="/">
            FaceList
          </Link>
          <SearchBox />
          {props.location.pathname !== "/signup" && (
            <label className="menu-button" htmlFor="dummy" />
          )}
          {props.location.pathname !== "/signup" && (
            <div className="user-block">
              {!props.isLoggedIn ? <Login /> : <UserBar />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(
  connect(
    (state: AppState) => ({
      isLoggedIn: state.user.isLoggedIn,
    }),
    null,
  )(Header),
);
