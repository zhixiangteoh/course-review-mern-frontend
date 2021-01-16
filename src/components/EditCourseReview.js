import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { Link } from "react-router-dom";
import axios from "axios";

import CourseReviewForm from "./CourseReviewForm";
import { API_URL } from "../enums";

let starting = {};

class EditCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

    // initialize starting
    if (this.props.location.state) {
      starting = this.props.location.state;
      const { semester, author, authorId } = this.props.location.state;
      starting.semester = semester.substr(0, semester.length - (4 + 1));
      starting.year = semester.slice(semester.length - 4);
      starting.author = author;
      starting.authorId = authorId;
      console.log(starting);
      return;
    }

    axios
      .get(`${API_URL}/coursereviews/` + this.props.match.params.id)
      .then((response) => {
        starting = response.data;
        starting.semester = response.data.semester.substr(
          0,
          response.data.semester.length - (4 + 1)
        );
        starting.year = Number(
          response.data.semester.slice(response.data.semester.length - 4)
        );
        starting.author = response.data.author;
        starting.authorId = response.data.authorId;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSubmit(coursereview) {
    coursereview.semester += ` ${coursereview.year}`;
    coursereview.author = this.props.user.name;
    coursereview.authorId = this.props.user._id;
    coursereview.rating =
      (Number(coursereview.workloadrating) + Number(coursereview.examsrating)) /
      2;

    console.log(coursereview);

    axios
      .post(
        `${API_URL}/coursereviews/update/` + this.props.match.params.id,
        coursereview
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3>Edit Course Review</h3>
        {this.props.isAuthenticated &&
        this.props.user &&
        this.props.user._id === starting.authorId ? (
          <CourseReviewForm
            onSubmit={this.onSubmit}
            starting={starting}
            action="Edit"
          />
        ) : (
          <p className="text-danger">
            Please{" "}
            <Link to="/login" className="nav-link">
              login
            </Link>{" "}
            to edit this course review.{" "}
            <Link to="/logout" onClick={logout} className="nav-link">
              Logout
            </Link>{" "}
            first if you are already logged in as another user.
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(EditCourseReview);
