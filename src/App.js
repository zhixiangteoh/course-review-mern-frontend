import React, { useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import EditCourseReview from "./components/EditCourseReview";
import CreateCourseReview from "./components/CreateCourseReview";
import Course from "./components/Course";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <div className="container-fluid">
          <Navbar />
          <br />
          <Switch>
            <Route exact path="/" component={CoursesList} />
            <Route
              path="/create"
              render={(props) => <CreateCourseReview {...props} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="/logout" to="/" />
            <Redirect from="/delete" to="/" />
            <Route
              path="/edit/:id"
              render={(props) => <EditCourseReview {...props} />}
            />
            <Route path="/:id" component={Course} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
