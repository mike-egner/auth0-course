import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import Nav from "./Nav";

function App() {
  return (
    <>
      <Nav />
      <div className="body">
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
      </div>
    </>
  );
}

export default App;
