import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import Nav from "./Nav";
import Auth from "././auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <HomePage auth={this.auth} {...props} />}
          />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </>
    );
  }
}

export default App;
