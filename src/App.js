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
import Home from "./components/Home";
import EditCourseReview from "./components/EditCourseReview";
import CreateCourseReview from "./components/CreateCourseReview";
import Course from "./components/Course";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Activate from "./components/auth/Activate";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import UserProvider from "./providers/UserProvider";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <UserProvider>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container-fluid">
            <br />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/create"
                render={(props) => <CreateCourseReview {...props} />}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route
                path="/users/password/forget"
                exact
                component={ForgotPassword}
              />
              <Route
                path="/users/password/reset/:token"
                exact
                component={ResetPassword}
              />
              <Route
                path="/users/activate/:token"
                exact
                render={(props) => <Activate {...props} />}
              />
              <Redirect from="/logout" to="/" />
              <Redirect from="/delete" to="/" />
              <Route
                path="/edit/:id"
                render={(props) => <EditCourseReview {...props} />}
              />
              <Route path="/:id" exact component={Course} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </UserProvider>
  );
};

export default App;
