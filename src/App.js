import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import Nav from "./Nav";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Public from "./Public";

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
          <Route
            path="/profile"
            render={props =>
              this.auth.isAuthenticated() ? (
                <ProfilePage auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/public" component={Public} />
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
