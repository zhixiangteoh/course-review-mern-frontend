import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";

const Navbar = ({ auth, logout }) => {
  const authLinks = () => (
    <Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <div className="nav-link">
            {auth && auth.user ? `${auth.user.name}` : ""}
          </div>
        </li>
        <li className="navbar-item">
          <Link to="/logout" onClick={logout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const renderLogin = () => {
    if (auth && auth.isAuthenticated) {
      return authLinks();
    } else {
      return guestLinks;
    }
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

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
