import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { API_URL } from "../enums";

// functional component
const Course = ({
  course,
  deleteCourse,
  user_id,
  authorId,
  isAuthenticated,
}) => (
  <tr>
    <td>{course.university}</td>
    <td>{course.subject}</td>
    <td>{course.code}</td>
    <td>
      <Link to={{ pathname: "/" + course._id, state: course }}>
        {course.name}
      </Link>
    </td>
    <td>{course.semester}</td>
    <td>
      <ReactMarkdown plugins={[gfm]} source={`${course.professor}`} />
    </td>
    <td>{course.rating}</td>
    <td>{course.author}</td>
    <td>
      {isAuthenticated && user_id === authorId ? (
        <Fragment>
          <Link to={{ pathname: "/edit/" + course._id, state: course }}>
            edit
          </Link>{" "}
          |{" "}
          <Link
            to={`/delete/${course._id}`}
            onClick={() => {
              deleteCourse(course._id);
            }}
          >
            delete
          </Link>
        </Fragment>
      ) : (
        <div className="text-secondary">Unauthorized</div>
      )}
    </td>
  </tr>
);

const CoursesList = ({ isAuthenticated, user }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/coursereviews/`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteCourse = (id) => {
    axios.delete(`${API_URL}/coursereviews/${id}`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      courses: this.state.courses.filter((el) => el._id !== id), // update courses array
    });
  };

  const courseList = () => {
    return courses.map((currentcourse) => {
      return (
        <Course
          course={currentcourse}
          deleteCourse={deleteCourse}
          isAuthenticated={isAuthenticated}
          user_id={user ? user._id : ""}
          authorId={currentcourse.authorId}
          key={currentcourse._id} // must-have
        />
      );
    });
  };

  return (
    <div>
      <h3>Reviewed Courses</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>University</th>
            <th>Subject</th>
            <th>Code</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Professor</th>
            <th>Rating</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{courseList()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(CoursesList);
