import React, { Component, Fragment, useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../providers/UserProvider';

import CourseReviewForm from "./CourseReviewForm";
import { SEMESTERS, SUBJECTS, UNIVERSITIES } from "../enums";

class CreateCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
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
      .post(`${process.env.REACT_APP_API_URL}/coursereviews/add`, coursereview)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div>
        <h3>Create New Course Review</h3>
        {this.props.isAuthenticated ? (
          <Fragment>
            <p>
              Creating new course review as{" "}
              <span className="text-info">
                {this.props.user.name} ({this.props.user.email})
              </span>
              :
            </p>
            <CourseReviewForm
              onSubmit={this.onSubmit}
              starting={{
                university: UNIVERSITIES[0],
                subject: SUBJECTS[0],
                semester: SEMESTERS[0],
                year: Number(new Date().getFullYear()),
              }}
              action="Create"
            />
          </Fragment>
        ) : (
          <p className="text-danger">
            Please <Link to="/login">login</Link> to create a course review.
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

export default connect(mapStateToProps, null)(CreateCourseReview);
