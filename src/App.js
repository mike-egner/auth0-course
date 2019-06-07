import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import Nav from "./Nav";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <HomePage auth={this.auth} {...props} />}
          />

          <PrivateRoute
            path="/profile"
            component={ProfilePage}
            auth={this.auth}
          />

          <Route path="/public" component={Public} />

          <PrivateRoute path="/private" component={Private} auth={this.auth} />

          <PrivateRoute
            path="/courses"
            component={Courses}
            auth={this.auth}
            scopes={["read:courses"]}
          />

          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
        </div>
      </>
    );
  }
}

export default App;
