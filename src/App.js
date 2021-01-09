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
    };
  }

  setToken(token) {
    this.setState({ token });
  }

  removeToken() {
    this.setState({ token: "" });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar
            removeToken={this.removeToken}
            isAuthed={this.state.token.length > 0}
          />
          <br />
          <Switch>
            <Route exact path="/" component={CoursesList} />
            {/* <Route path="/create" component={CreateCourseReview} /> */}
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
            <Route path="/edit/:id" component={EditCourseReview} />
            <Route path="/:id" component={Course} />
            {/* <Route path="/user" component={CreateUser} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
