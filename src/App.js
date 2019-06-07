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
import AuthContext from "./AuthContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <HomePage auth={auth} {...props} />}
          />

          <PrivateRoute path="/profile" component={ProfilePage} auth={auth} />

          <Route path="/public" component={Public} />

          <PrivateRoute path="/private" component={Private} auth={auth} />

          <PrivateRoute
            path="/courses"
            component={Courses}
            auth={auth}
            scopes={["read:courses"]}
          />

          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
