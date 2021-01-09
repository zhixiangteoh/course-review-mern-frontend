import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthed, removeToken }) => {
  console.log(`Authenticated: ${isAuthed}`);

  const renderLogin = () => {
    if (isAuthed) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link to="/" onClick={removeToken} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <Link to="/login" className="nav-link">
            Login/Register
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        Course Review
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Courses
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Course Review
            </Link>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse">{renderLogin()}</div>
    </nav>
  );
};

export default Navbar;
