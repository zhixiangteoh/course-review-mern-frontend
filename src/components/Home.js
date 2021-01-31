import React from "react";

import Intro from "./Intro";
import CoursesList from "./CoursesList";
import logo from "./logo.png";

const Home = ({ history }) => {
  return (
    <div>
      <div id="hero" className="my-5 text-center">
        <img src={logo} alt="Co-Re logo" style={{ maxWidth: 200 }} />
        <p className="mt-4 text-center">
          Your one-stop platform for all college course insights.
        </p>
        <p className="mb-4 text-center">
          Login to create course reviews, otherwise simply search for posted
          course reviews!
        </p>
        <div id="home-buttons" class="mx-auto">
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={() => history.push("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-warning mx-2"
            onClick={() => history.push("/register")}
          >
            Register
          </button>
        </div>
      </div>

      <h2>
        How to use{" "}
        <a href="./#reviews">
          <i className="fas fa-forward"></i>
        </a>
      </h2>
      <Intro />

      <h2 id="reviews">
        Reviews{" "}
        <a href="./#intro">
          <i className="fas fa-backward"></i>
        </a>
      </h2>
      <CoursesList />
    </div>
  );
};

export default Home;
