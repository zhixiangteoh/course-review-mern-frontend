import React, { Component } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { API_URL } from "../enums";

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
      general: "",
      tldr: "",
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
    if (this.props.location.state) {
      const {
        university,
        subject,
        code,
        name,
        semester,
        professor,
        rating,
        author,
        workloadrating,
        examsrating,
        general,
        tldr,
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
        rating,
        author,
        workloadrating,
        examsrating,
        general,
        tldr,
        syllabus,
        textbook,
        grading,
        workload,
        lectures,
        assignments,
        exams,
      });

      return;
    }

    axios
      .get(`${API_URL}/coursereviews/` + this.props.match.params.id)
      .then((response) => {
        this.setState({
          university: response.data.university,
          subject: response.data.subject,
          code: response.data.code,
          name: response.data.name,
          semester: response.data.semester,
          professor: response.data.professor,
          rating: response.data.rating,
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

  render() {
    // header
    const header = `# ${this.state.code} ${this.state.name}\n\nAuthor: **${this.state.author}**`;
    // context
    const context = `\n## Context\n\nUniversity: **${this.state.university}**\n\nSubject: **${this.state.subject}**\n\nSemester Taken: **${this.state.semester}**\n\nProfessor or Lecturer: **${this.state.professor}**`;
    // general comments
    const generalcomments = `\n## General Comments\n\nOverall Rating: **${this.state.rating}**\n\n${this.state.general}`;
    // tldr
    const tldr = `\n## TL;DR\n\n${this.state.tldr}`;
    // syllabus
    const syllabus = `\n## Syllabus\n\n${this.state.syllabus}\n\n### Main Textbook\n\n${this.state.textbook}`;
    // grading
    const grading = `\n## Grading\n\n${this.state.grading}`;
    // workload
    const workload = `\n## Workload\n\nRating: **${this.state.workloadrating}**\n\n${this.state.workload}\n\n### Lectures\n\n${this.state.lectures}\n\n### Assignments\n\n${this.state.assignments}`;
    // exams
    const exams = `\n## Exams\n\nRating: **${this.state.examsrating}**\n\n${this.state.exams}`;

    return (
      <div>
        <ReactMarkdown
          plugins={[gfm]}
          source={
            header +
            context +
            generalcomments +
            tldr +
            syllabus +
            grading +
            workload +
            exams
          }
        ></ReactMarkdown>
      </div>
    );
  }
}
