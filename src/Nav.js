import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/public">Public</Link>
            </li>
            <li>
              {isAuthenticated() ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <button onClick={login}>Login</button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
