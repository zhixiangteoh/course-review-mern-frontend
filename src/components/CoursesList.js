import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { API_URL } from "../enums";

// algolia
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  connectHits,
} from "react-instantsearch-dom";

const client = algoliasearch("STBZR8UCCC", "f1b7a3b1b69ee5c64ad8b07992a0ef30");

// functional component
const Course = ({
  hit,
  course,
  deleteCourse,
  isAuthenticated,
  user_id,
  authorId,
}) => {
  return (
    <tr>
      <td>
        <Highlight attribute="university" hit={hit}>
          {hit.university}
        </Highlight>
      </td>
      <td>
        <Highlight attribute="subject" hit={hit}>
          {hit.subject}
        </Highlight>
      </td>
      <td>
        <Highlight attribute="code" hit={hit}>
          {hit.code}
        </Highlight>
      </td>
      <td>
        <Link to={{ pathname: "/" + hit._id, state: course }}>
          <Highlight attribute="name" hit={hit}>
            {hit.name}
          </Highlight>
        </Link>
      </td>
      <td>
        <Highlight attribute="semester" hit={hit}>
          {hit.semester}
        </Highlight>
      </td>
      <td>
        <ReactMarkdown plugins={[gfm]} source={`${hit.professor}`} />
      </td>
      <td>
        <Highlight attribute="rating" hit={hit}>
          {hit.rating}
        </Highlight>
      </td>
      <td>
        <Highlight attribute="author" hit={hit}>
          {hit.author}
        </Highlight>
      </td>
      <td>
        {isAuthenticated && user_id === authorId ? (
          <Fragment>
            <Link to={{ pathname: "/edit/" + hit._id, state: course }}>
              edit
            </Link>{" "}
            |{" "}
            <Link
              to={`/delete/${hit._id}`}
              onClick={() => {
                deleteCourse(hit._id);
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
};

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
  });

  const deleteCourse = (id) => {
    axios.delete(`${API_URL}/coursereviews/${id}`).then((response) => {
      console.log(response.data);
    });

    setCourses(courses.filter((el) => el._id !== id));
  };

  // 1. Create a React component
  const Hits = ({ hits }) => {
    return hits.map((hit) => {
      return (
        <Course
          hit={hit}
          course={courses.filter((course) => course._id === hit._id)}
          deleteCourse={deleteCourse}
          isAuthenticated={isAuthenticated}
          user_id={user ? user._id : ""}
          authorId={hit.authorId}
          key={hit._id} // must-have
        />
      );
    });
  };

  // 2. Connect the component using the connector
  const CustomHits = connectHits(Hits);

  return (
    <div>
      <h3>Reviewed Courses</h3>
      <InstantSearch
        searchClient={client}
        indexName="course-review-mern-frontend"
      >
        <SearchBox />
        <br />
        <div className="table-responsive">
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
            <tbody>
              <CustomHits />
            </tbody>
          </table>
        </div>
      </InstantSearch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(CoursesList);
