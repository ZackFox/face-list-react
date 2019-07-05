import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import CreateResume from './pages/CreateResume';
import { connect } from 'react-redux';
import { AppState } from './store';
import { getUser } from './actions/userActions';
import LoadingBox from './components/LoadingBox/LoadingBox';

const App: React.FunctionComponent<any> = props => {
  const { isLogined, loading, getUser } = props;

  useEffect(() => {
    if (isLogined) {
      getUser();
    }
  }, [isLogined]);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        {loading && <LoadingBox />}
        <div className="wrapper">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/page/:numPage" component={HomePage} />
            <Route path="/resume/:id" component={ResumePage} />
            <Route path="/create" component={CreateResume} />
          </Switch>
        </div>
      </main>
      <footer>
        <div className="wrapper">футер</div>
      </footer>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    isLogined: state.user.isLogined,
    loading: state.resume.loading,
  }),
  { getUser },
)(App);
