import React, { Component } from "react";
import axios from "axios";

export default class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      university: "",
      subject: "",
      code: "",
      name: "",
      semester: "",
      professor: "",
      rating: 0,
      author: "",
      workloadrating: 0,
      examsrating: 0,
      syllabus: "",
      textbook: "",
      grading: "",
      workload: "",
      lectures: "",
      assignments: "",
      exams: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const {
      university,
      subject,
      code,
      name,
      semester,
      professor,
      author,
      rating,
      workloadrating,
      examsrating,
      syllabus,
      textbook,
      grading,
      workload,
      lectures,
      assignments,
      exams,
    } = this.props.location.state;

    this.setState({
      university,
      subject,
      code,
      name,
      semester,
      professor,
      author,
      rating,
      workloadrating,
      examsrating,
      syllabus,
      textbook,
      grading,
      workload,
      lectures,
      assignments,
      exams,
    });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Course Review</h1>
        <p>Author: {this.state.author}</p>

        <h2>Basic Information</h2>
        <p>University: {this.state.university}</p>
        <p>Subject: {this.state.subject}</p>
        <p>Course Code: {this.state.code}</p>
        <p>Course Name: {this.state.name}</p>
        <p>Semester Taken: {this.state.semester}</p>
        <p>Professor or Lecturer: {this.state.professor}</p>
        <p>Overall Rating: {this.state.rating}</p>

        <h2>Course Details</h2>

        <h3>Syllabus</h3>
        <h4>General Comments</h4>
        <p>{this.state.syllabus}</p>
        <p>Main Textbook: {this.state.textbook}</p>

        <h3>Grading</h3>
        <h4>General Comments</h4>
        <p>{this.state.grading}</p>

        <h3>Workload</h3>
        <h4>General Comments</h4>
        <p>{this.state.grading}</p>
        <p>Rating: {this.state.workloadrating}</p>

        <h4></h4>
        <p>Lectures: {this.state.lectures}</p>
        <p>Assignments: {this.state.assignments}</p>

        <h3>Exams</h3>
        <h4>General Comments</h4>
        <p>{this.state.exams}</p>
        <p>Rating: {this.state.examsrating}</p>
      </div>
    );
  }
}
