import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

// functional component
const Course = ({ course, deleteCourse }) => (
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
      <Link to={{ pathname: "/edit/" + course._id, state: course }}>edit</Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          deleteCourse(course._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class CoursesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = { courses: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/coursereviews/")
      .then((response) => {
        this.setState({ courses: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCourse(id) {
    axios
      .delete(`http://localhost:5000/coursereviews/${id}`)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      courses: this.state.courses.filter((el) => el._id !== id), // update courses array
    });
  }

  courseList() {
    return this.state.courses.map((currentcourse) => {
      return (
        <Course
          course={currentcourse}
          deleteCourse={this.deleteCourse}
          key={currentcourse._id} // must-have
        />
      );
    });
  }

  render() {
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
          <tbody>{this.courseList()}</tbody>
        </table>
      </div>
    );
  }
}
