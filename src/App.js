import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import EditCourseReview from "./components/EditCourseReview";
import CreateCourseReview from "./components/CreateCourseReview";
import Course from "./components/Course";
import Test from "./components/Test";
// import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={CoursesList} />
        <Route exact path="/:id" component={Test} />
        <Route exact path="/edit/:id" component={EditCourseReview} />
        <Route path="/create" component={CreateCourseReview} />
        {/* <Route
          exact
          path="/coursereviews/5ff450ebe49205ba28f61157"
          component={Test}
        /> */}
        {/* <Route path="/user" component={CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;
