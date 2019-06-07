import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: [],
    message: "",
    error: ""
  };

  componentDidMount() {
    fetch("/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ courses: response.courses }))
      .catch(error => this.setState({ error: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    return (
      <>
        <ul>
          {this.state.courses.map(course => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
        <p>{this.state.error}</p>
        <p>{this.state.message}</p>
      </>
    );
  }
}

export default Courses;
