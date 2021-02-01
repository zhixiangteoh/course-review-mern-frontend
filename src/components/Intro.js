import React from "react";

import "./Intro.css";

const backgroundColor = "#244180";
const color = "#f0f0f0";

const Intro = () => {
  return (
    <div
      id="intro"
      className="rounded p-4 mb-5 text-justify"
      style={{ backgroundColor, color }}
    >
      <h4 className="abbr">Create an account</h4>
      <p>
        To create an account, simply click on the{" "}
        <span className="text-warning">Register</span> button above or in the
        navigation bar to fill in a simple form! To login, click on the{" "}
        <span className="text-primary">Login</span> button above or in the
        navigation bar.
      </p>
      <hr />
      <h4>Write a course review</h4>
      <p>
        To create a course review, click on{" "}
        <span className="font-weight-bold">Create Course Review</span> in the
        navigation bar.
      </p>
      <pre className="ml-4 mt-1 text-light">
        Note: Markdown is supported on all forms!
      </pre>
      <hr />
      <h4>Edit your course review</h4>
      <p>
        Humans are not perfect! Edit your course reviews from the list of
        reviews by clicking the <span className="font-weight-bold">Edit</span>{" "}
        link in the Actions column associated with your review.
      </p>
      <pre className="ml-4 mt-1 text-light">
        Note: If you are not logged in, you won't be authorized to edit or
        delete a review!
      </pre>
      <hr />
      <h4>Delete your course review</h4>
      <p>
        Think your information is outdated or just want to remove it your
        review? Simply click on the{" "}
        <span className="font-weight-bold">Delete</span> link in the Actions
        column associated with your review to delete it.
      </p>
      <pre className="ml-4 mt-1 text-light">
        Note: Deleting is irreversible!
      </pre>
      <hr />
      <h4>View other course reviews</h4>
      <p>
        Co-Re's home page lists all course reviews written by everyone who has
        ever used the platform. This is in line with Co-Re's goal to be a
        one-stop platform for all comprehensive college course information,
        opinions and discussion!
      </p>
      <p>
        Just search and click on any past course offering you want to learn more
        about to inform your decisions on future courses.
      </p>

      <hr />

      <h4>Frequently Asked Questions (FAQ)</h4>
      <p>Is my password protected?</p>
      <pre className="ml-4 mt-1 text-light">
        Co-Re hashes all passwords prior to storing them in a database.
        Currently, the platform does not require any personal information other
        than the user's name and email, for verification.
      </pre>
      <p>Why is the platform so buggy?</p>
      <pre className="ml-4 mt-1 text-light">
        This platform is a work in progress! Also, I am relatively new to web
        development. For all issues and suggestions related to the website,
        please feel free to{" "}
        <span className="dotted-underline">
          <a
            href={`${process.env.CLIENT_URL}/issues`}
            target="_blank"
            rel="noreferrer"
          >
            create an issue
          </a>
        </span>{" "}
        at the live maintained repository, or{" "}
        <span className="dotted-underline">
          <a href="mailto:zhixiangteoh@gmail.com">send me an email</a>
        </span>
        .
      </pre>
    </div>
  );
};

export default Intro;
