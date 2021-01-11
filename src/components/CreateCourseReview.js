import React, { Component } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";

import FormStyles from "./FormStyles";

export default class CreateCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: "",

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
  }

  onSubmit(coursereview) {
    coursereview.semester += ` ${coursereview.year}`;
    coursereview.author = this.state.author;
    coursereview.rating =
      (Number(coursereview.workloadrating) + Number(coursereview.examsrating)) /
      2;

    console.log(coursereview);

    axios
      .post("http://localhost:5000/coursereviews/add", coursereview)
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
        <h3>Create New Course Review</h3>
        <FormStyles>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <h4>Basic Information</h4>
                <Field
                  name="university"
                  initialValue={this.state.universities[0]}
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
                  initialValue={this.state.subjects[0]}
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
                <Field name="code" validate={required}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Course Code</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="name" validate={required}>
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
                  initialValue={this.state.semesters[0]}
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
                  initialValue={new Date().getFullYear()}
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
                <Field name="professor" validate={required}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Professor / Lecturer</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h4>Course Details</h4>
                <Field name="general" validate={required}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>General Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="tldr" validate={required}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>TL;DR</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Syllabus</h5>
                <Field name="syllabus">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="textbook" validate={required}>
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Main Textbook / Teaching Material</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Grading</h5>
                <Field name="grading">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Comments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Workload</h5>
                <Field name="workload">
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
                <Field name="lectures">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Lectures</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="assignments">
                  {({ input, meta }) => (
                    <div className="form-group">
                      <label>Assignments</label>
                      <textarea {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <h5>Exams</h5>
                <Field name="exams">
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
                    Create Course Review
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
