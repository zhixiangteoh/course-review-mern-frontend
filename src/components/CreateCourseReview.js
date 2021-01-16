import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import axios from "axios";

import FormStyles from "./FormStyles";
import { UNIVERSITIES, SUBJECTS, SEMESTERS, API_URL } from "../enums";

class CreateCourseReview extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(coursereview) {
    coursereview.semester += ` ${coursereview.year}`;
    coursereview.author = this.props.user.name;
    coursereview.authorId = this.props.user.id;
    coursereview.rating =
      (Number(coursereview.workloadrating) + Number(coursereview.examsrating)) /
      2;

    console.log(coursereview);

    axios
      .post(`${API_URL}/coursereviews/add`, coursereview)
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
        {this.props.isAuthenticated ? (
          <FormStyles>
            <p>
              Creating course review as{" "}
              <span className="text-info">
                {this.props.user.name} ({this.props.user.email})
              </span>
              :
            </p>
            <Form
              onSubmit={this.onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <h4>Basic Information</h4>
                  <Field
                    name="university"
                    initialValue={UNIVERSITIES[0]}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <div>
                        <label>University</label>
                        <select {...input} type="text">
                          {UNIVERSITIES.map(function (university) {
                            return (
                              <option
                                key={university} // must-have
                              >
                                {university}
                              </option>
                            );
                          })}
                        </select>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field
                    name="subject"
                    initialValue={SUBJECTS[0]}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <div>
                        <label>Subject</label>
                        <select {...input} type="text">
                          {SUBJECTS.map(function (subject) {
                            return (
                              <option
                                key={subject} // must-have
                              >
                                {subject}
                              </option>
                            );
                          })}
                        </select>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="code" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Course Code</label>
                        <input {...input} type="text" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="name" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Course Name</label>
                        <input {...input} type="text" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field
                    name="semester"
                    initialValue={SEMESTERS[0]}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <div>
                        <label>Semester</label>
                        <select {...input} type="text">
                          {SEMESTERS.map(function (semester) {
                            return (
                              <option
                                key={semester} // must-have
                              >
                                {semester}
                              </option>
                            );
                          })}
                        </select>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
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
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="professor" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Professor / Lecturer</label>
                        <input {...input} type="text" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h4>Course Details</h4>
                  <Field name="general" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>General Comments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="tldr" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>TL;DR</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h5>Syllabus</h5>
                  <Field name="syllabus">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Comments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="textbook" validate={required}>
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Main Textbook / Teaching Material</label>
                        <input {...input} type="text" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h5>Grading</h5>
                  <Field name="grading">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Comments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h5>Workload</h5>
                  <Field name="workload">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Comments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
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
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="lectures">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Lectures</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="assignments">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Assignments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h5>Exams</h5>
                  <Field name="exams">
                    {({ input, meta }) => (
                      <div className="form-group">
                        <label>Comments</label>
                        <textarea {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
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
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
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
