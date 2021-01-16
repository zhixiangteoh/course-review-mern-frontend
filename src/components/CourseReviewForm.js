import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import FormStyles from "./FormStyles";
import { UNIVERSITIES, SUBJECTS, SEMESTERS } from "../enums";

const renderYears = () => {
  let years = [];
  const min = 1960;
  const max = new Date().getFullYear();
  for (let i = max; i >= min; i--) {
    years.push(i);
  }

  return years.map((year) => {
    return <option key={year}>{year}</option>;
  });
};

const CourseReviewForm = ({ onSubmit, starting, action }) => {
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
    <FormStyles>
      <Form
        onSubmit={onSubmit}
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
                    {UNIVERSITIES.map(function (university) {
                      return (
                        <option
                          {...input}
                          key={university} // must-have
                        >
                          {university}
                        </option>
                      );
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
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="code" initialValue={starting.code} validate={required}>
              {({ input, meta }) => (
                <div className="form-group">
                  <label>Course Code</label>
                  <input {...input} type="text" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="name" initialValue={starting.name} validate={required}>
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
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="year"
              initialValue={Number(starting.year)}
              validate={composeValidators(required, mustBeNumber)}
            >
              {({ input, meta }) => (
                <div>
                  <label>Year</label>
                  <select {...input} type="number">
                    {renderYears()}
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
                <Fragment>
                  <div className="form-group">
                    <label>Professor / Lecturer</label>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.professor ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.professor}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <h4>Course Details</h4>
            <Field
              name="general"
              initialValue={starting.general}
              validate={required}
            >
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>General Comments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.general ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.general}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <Field name="tldr" initialValue={starting.tldr} validate={required}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>TL;DR</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.tldr ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.tldr}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <h5>Syllabus</h5>
            <Field name="syllabus" initialValue={starting.syllabus}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.syllabus ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.syllabus}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <Field
              name="textbook"
              initialValue={starting.textbook}
              validate={required}
            >
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Main Textbook / Teaching Material</label>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.textbook ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.textbook}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <h5>Grading</h5>
            <Field name="grading" initialValue={starting.grading}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.grading ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.grading}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <h5>Workload</h5>
            <Field name="workload" initialValue={starting.workload}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.workload ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.workload}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
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
                <Fragment>
                  <div className="form-group">
                    <label>Lectures</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.lectures ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.lectures}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <Field name="assignments" initialValue={starting.assignments}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Assignments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.assignments ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.assignments}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <h5>Exams</h5>
            <Field name="exams" initialValue={starting.exams}>
              {({ input, meta }) => (
                <Fragment>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                  {values.exams ? (
                    <div className="md">
                      <ReactMarkdown
                        plugins={[gfm]}
                        source={`${values.exams}`}
                      />
                    </div>
                  ) : null}
                </Fragment>
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
                {`${action} Course Review`}
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </FormStyles>
  );
};

export default CourseReviewForm;
