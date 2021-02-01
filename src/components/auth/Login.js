import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const Login = ({
  isAuthenticated,
  error,
  login,
  clearErrors,
  history,
  location,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    login(user);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated
    if (isAuthenticated) {
      history.push("/");
    }
  }, [error, isAuthenticated, history]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        {msg ? <p className="text-danger">{msg}</p> : null}
        <div className="form-group">
          <label>Email: </label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
          <div className="form-group">
            <Link to="/register" className="nav-link">
              New? Register here!
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, logout, clearErrors })(Login);
