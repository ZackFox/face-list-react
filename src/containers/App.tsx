import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import HomePage from "./HomePage";
import ResumePage from "./ResumePage";
import CreateResume from "./CreateResume";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="app-main">
          <div className="wrapper">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/page/:num" component={HomePage} />
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
  }
}

export default App;
