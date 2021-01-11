import React, { Component } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";

import FormStyles from "./FormStyles";

let starting = {};

export default class EditCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
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
    // authenticate
    const token = this.props.token;

    axios
      .get("http://localhost:5000/auth/user", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        console.log(response);
        this.setState({ author: response.data.name });
      })
      .catch((error) => {
        console.log(error);
      });

    // initialize starting
    if (this.props.location.state) {
      starting = this.props.location.state;
      const { semester } = this.props.location.state;
      starting.semester = semester.substr(0, semester.length - (4 + 1));
      starting.year = Number(semester.slice(semester.length - 4));
      return;
    }

    axios
      .get("http://localhost:5000/coursereviews/" + this.props.match.params.id)
      .then((response) => {
        starting = response.data;
        starting.semester = response.data.semester.substr(
          0,
          response.data.semester.length - (4 + 1)
        );
        starting.year = Number(
          response.data.semester.slice(response.data.semester.length - 4)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSubmit(coursereview) {
    coursereview.semester += ` ${coursereview.year}`;
    coursereview.author = this.state.author;
    coursereview.rating =
      (Number(coursereview.workloadrating) + Number(coursereview.examsrating)) /
      2;

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
    for (let i = max; i >= min; i--) {
      years.push(i);
    }

    return years.map((year) => {
      return <option key={year}>{year}</option>;
    });
  }

  render() {
    // validators
    const required = (value) => (value ? undefined : "Required");
    const mustBeNumber = (value) =>
      isNaN(value) ? "Must be a number" : undefined;
    const composeValidators = (...validators) => (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

    return (
      <div>
        <h3>Edit Course Review</h3>
        <FormStyles>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <h4>Basic Information</h4>
                <Field
                  name="university"
                  initialValue={starting.university}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>University</label>
                      <select {...input} type="text">
                        {this.state.universities.map(function (university) {
                          return <option {...input}>{university}</option>;
                        })}
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="subject"
                  initialValue={starting.subject}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>Subject</label>
                      <select {...input} type="text">
                        {this.state.subjects.map(function (subject) {
                          return (
                            <option
                              key={subject} // must-have
                            >
                              {subject}
                            </option>
                          );
                        })}
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="code"
                  initialValue={starting.code}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Course Code</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="name"
                  initialValue={starting.name}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Course Name</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="semester"
                  initialValue={starting.semester}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>Semester</label>
                      <select {...input} type="text">
                        {this.state.semesters.map(function (semester) {
                          return (
                            <option
                              key={semester} // must-have
                            >
                              {semester}
                            </option>
                          );
                        })}
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="year"
                  initialValue={starting.year}
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>Year</label>
                      <select {...input} type="number">
                        {this.renderYears()}
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="professor"
                  initialValue={starting.professor}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Professor / Lecturer</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h4>Course Details</h4>
                <Field
                  name="general"
                  initialValue={starting.general}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>General Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="tldr"
                  initialValue={starting.tldr}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>TL;DR</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Syllabus</h5>
                <Field name="syllabus" initialValue={starting.syllabus}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="textbook"
                  initialValue={starting.textbook}
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Main Textbook / Teaching Material</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Grading</h5>
                <Field name="grading" initialValue={starting.grading}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Workload</h5>
                <Field name="workload" initialValue={starting.workload}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="workloadrating"
                  initialValue={starting.workloadrating}
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Rating</label>
                      <input {...input} type="number" min="1" max="5" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="lectures" initialValue={starting.lectures}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Lectures</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="assignments" initialValue={starting.assignments}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Assignments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Exams</h5>
                <Field name="exams" initialValue={starting.exams}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="examsrating"
                  initialValue={starting.examsrating}
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Rating</label>
                      <input {...input} type="number" min="1" max="5" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Edit Course Review
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </FormStyles>
      </div>
    );
  }
}
