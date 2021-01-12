import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { REGISTER_FAIL } from "../../actions/types";

const Register = ({
  isAuthenticated,
  error,
  register,
  clearErrors,
  history,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = { name, email, password };
    register(user);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === REGISTER_FAIL) {
      setMsg(error.msg.error);
    } else {
      setMsg(null);
    }

    // If authenticated, login and redirect to home page
    if (isAuthenticated) {
      history.push("/");
    }
  }, [error, isAuthenticated, history]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        {msg ? <p className="text-danger">{msg}</p> : null}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Register and Login"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
