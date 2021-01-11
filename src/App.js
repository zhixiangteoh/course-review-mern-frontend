import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import EditCourseReview from "./components/EditCourseReview";
import CreateCourseReview from "./components/CreateCourseReview";
import Course from "./components/Course";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  constructor(props) {
    super(props);

    this.setToken = this.setToken.bind(this);
    this.removeToken = this.removeToken.bind(this);

    this.state = {
      token: "",
      isAuthed: false,
    };
  }

  setToken(token) {
    this.setState({ token, isAuthed: true });
  }

  removeToken() {
    this.setState({ token: "", isAuthed: false });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar
            removeToken={this.removeToken}
            isAuthed={this.state.isAuthed}
          />
          <br />
          <Switch>
            <Route exact path="/" component={CoursesList} />
            <Route
              path="/create"
              render={(props) => (
                <CreateCourseReview {...props} token={this.state.token} />
              )}
            />
            <Route
              path="/login"
              render={(props) => <Login {...props} sendToken={this.setToken} />}
            />
            <Route path="/register" component={Register} />
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditCourseReview {...props} token={this.state.token} />
              )}
            />
            <Route path="/:id" component={Course} />
            {/* <Route path="/user" component={CreateUser} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
