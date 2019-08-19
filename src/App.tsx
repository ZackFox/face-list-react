import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { AppState } from "./store";

import Header from "./components/Header/Header";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import CreateResume from "./pages/CreateResume";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { getUser } from "./actions/userActions";
import { User } from "./store/types";

interface AppProps {
  isLoggedIn: boolean;
  user: User | null;
  getUser: () => void;
}

const App: React.FunctionComponent<AppProps> = ({
  isLoggedIn,
  getUser,
  user,
}) => {
  useEffect(() => {
    if (isLoggedIn && !user) {
      getUser();
    }
  }, [isLoggedIn]);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/page/:numPage" component={HomePage} />
          <Route path="/resume/:id" component={ResumePage} />
          <ProtectedRoute
            path="/create"
            isLoggedIn={isLoggedIn}
            component={CreateResume}
            redirectTo={"/page/1"}
          />
          <ProtectedRoute
            path="/signup"
            isLoggedIn={!isLoggedIn}
            component={Registration}
            redirectTo={"/page/1"}
          />
        </Switch>
      </main>
      <footer>
        <div className="wrapper">
          <a href="https://github.com/ZackFox/face-list-react">source code</a>
        </div>
      </footer>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.data,
  }),
  { getUser },
)(App);
