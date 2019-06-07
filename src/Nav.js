import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
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

            {isAuthenticated() && (
              <li>
                <Link to="/private">Private</Link>
              </li>
            )}

            {isAuthenticated() && userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            )}

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
