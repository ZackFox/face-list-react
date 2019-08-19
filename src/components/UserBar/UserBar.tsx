import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../../store";
import { User } from "../../store/types";
import { logout } from "../../actions/userActions";

import "./UserBar.css";

interface UserBarProps {
  user: User | null;
  logout: () => void;
}

const UserBar: React.FunctionComponent<UserBarProps> = props => {
  const { user, logout } = props;

  const onLogout = () => logout();

  if (!user) {
    return <span>...авторизация</span>;
  }

  return (
    <div className="userbar">
      <Link to="/create" className="button create-button">
        создать
      </Link>
      <div className="user-menu">
        <span className="user-menu-title">
          {user && `${user.firstname} ${user.lastname}`}
        </span>
        <div className="user-menu-dropdown">
          <button className="button logout-button" onClick={onLogout}>
            Выйти
          </button>
          <ul>
            <h4>Мои резюме: </h4>
            {user.resumes.map((item: any) => (
              <li key={item.id}>
                <Link className="resume-link" to={`/resume/${item.id}`}>
                  {item.position}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    user: state.user.data,
  }),
  { logout },
)(UserBar);
