import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class EditCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      university: "",
      subject: "",
      code: "",
      name: "",
      semester: "",
      year: 0,
      professor: "",
      author: "",
      workloadrating: 0,
      examsrating: 0,
      general: "",
      tldr: "",
      syllabus: "",
      textbook: "",
      grading: "",
      workload: "",
      lectures: "",
      assignments: "",
      exams: "",
      universities: [
        "National University of Singapore",
        "University of Pittsburgh, Pittsburgh",
        "University of Michigan, Ann Arbor",
      ],
      subjects: ["Mathematics", "Computer Science"],
      semesters: ["Fall", "Spring", "Summer", "Winter"],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/coursereviews/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          university: response.data.university,
          subject: response.data.subject,
          code: response.data.code,
          name: response.data.name,
          semester: response.data.semester.substr(
            0,
            response.data.semester.length - (4 + 1)
          ),
          year: Number(
            response.data.semester.slice(response.data.semester.length - 4)
          ),
          professor: response.data.professor,
          author: response.data.author,
          workloadrating: response.data.workloadrating,
          examsrating: response.data.examsrating,
          general: response.data.general,
          tldr: response.data.tldr,
          syllabus: response.data.syllabus,
          textbook: response.data.textbook,
          grading: response.data.grading,
          workload: response.data.workload,
          lectures: response.data.lectures,
          assignments: response.data.assignments,
          exams: response.data.exams,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const coursereview = {
      university: this.state.university,
      subject: this.state.subject,
      code: this.state.code,
      name: this.state.name,
      semester: this.state.semester + " " + this.state.year,
      professor: this.state.professor,
      author: this.state.author,
      rating:
        (Number(this.state.workloadrating) + Number(this.state.examsrating)) /
        2,
      workloadrating: Number(this.state.workloadrating),
      examsrating: Number(this.state.examsrating),
      general: this.state.general,
      tldr: this.state.tldr,
      syllabus: this.state.syllabus,
      textbook: this.state.textbook,
      grading: this.state.grading,
      workload: this.state.workload,
      lectures: this.state.lectures,
      assignments: this.state.assignments,
      exams: this.state.exams,
    };

    console.log(coursereview);

    axios
      .post(
        "http://localhost:5000/coursereviews/update/" +
          this.props.match.params.id,
        coursereview
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  renderYears() {
    let years = [];
    const min = 1960;
    const max = new Date().getFullYear();
    for (let i = min; i <= max; i++) {
      years.push(i);
    }

    return years.map((year) => {
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Edit Course Review</h3>
        <form onSubmit={this.onSubmit}>
          <h4>Basic Information</h4>
          <div className="form-group">
            <label>University: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.university}
              onChange={(e) => this.setState({ university: e.target.value })}
            >
              {this.state.universities.map(function (university) {
                return (
                  <option
                    key={university} // must-have
                    value={university}
                  >
                    {university}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Subject: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.subject}
              onChange={(e) => this.setState({ subject: e.target.value })}
            >
              {this.state.subjects.map(function (subject) {
                return (
                  <option
                    key={subject} // must-have
                    value={subject}
                  >
                    {subject}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Course Code: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.code}
              onChange={(e) => this.setState({ code: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Course Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Semester Taken: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.semester}
              onChange={(e) => this.setState({ semester: e.target.value })}
            >
              {this.state.semesters.map(function (semester) {
                return (
                  <option
                    key={semester} // must-have
                    value={semester}
                  >
                    {semester}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Professor or Lecturer: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.professor}
              onChange={(e) => this.setState({ professor: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Year: </label>
            <select
              type="number"
              required
              className="form-control"
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
            >
              {this.renderYears()}
            </select>
          </div>
          <h4>Course Details</h4>
          <div className="form-group">
            <label>General Comments: </label>
            <textarea
              className="form-control"
              value={this.state.general}
              onChange={(e) => this.setState({ general: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>TL;DR: </label>
            <textarea
              className="form-control"
              value={this.state.tldr}
              onChange={(e) => this.setState({ tldr: e.target.value })}
            />
          </div>
          <h5>Syllabus</h5>
          <div className="form-group">
            <label>General Comments: </label>
            <textarea
              className="form-control"
              value={this.state.syllabus}
              onChange={(e) => this.setState({ syllabus: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Main Textbook or Teaching Material: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.textbook}
              onChange={(e) => this.setState({ textbook: e.target.value })}
            />
          </div>
          <h5>Grading</h5>
          <div className="form-group">
            <label>General Comments: </label>
            <textarea
              className="form-control"
              value={this.state.grading}
              onChange={(e) => this.setState({ grading: e.target.value })}
            />
          </div>
          <h5>Workload</h5>
          <div className="form-group">
            <label>General Comments: </label>
            <textarea
              className="form-control"
              value={this.state.workload}
              onChange={(e) => this.setState({ workload: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Rating: </label>
            <input
              type="number"
              min="1"
              max="5"
              required
              className="form-control"
              value={this.state.workloadrating}
              onChange={(e) =>
                this.setState({ workloadrating: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Lectures: </label>
            <textarea
              className="form-control"
              value={this.state.lectures}
              onChange={(e) => this.setState({ lectures: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Assignments: </label>
            <textarea
              className="form-control"
              value={this.state.assignments}
              onChange={(e) => this.setState({ assignments: e.target.value })}
            />
          </div>
          <h5>Exams</h5>
          <div className="form-group">
            <label>General Comments: </label>
            <textarea
              className="form-control"
              value={this.state.exams}
              onChange={(e) => this.setState({ exams: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Rating: </label>
            <input
              type="number"
              min="1"
              max="5"
              required
              className="form-control"
              value={this.state.examsrating}
              onChange={(e) => this.setState({ examsrating: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Course Review"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
