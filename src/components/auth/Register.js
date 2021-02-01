import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { REGISTER_FAIL } from "../../actions/types";

const Register = ({ auth, error, register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

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
    // Check for register success
    if (auth.isAwaitingActivation) {
      setSuccess(auth.message);
    }
  }, [error, auth.isAwaitingActivation, auth.message]);

  const renderMessage = () => {
    if (msg && !success) {
      return <p className="text-danger">{msg}</p>;
    } else if (success) {
      return <p className="text-success">{success}</p>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {renderMessage()}
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
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
