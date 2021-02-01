import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { activate } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { ACTIVATE_FAIL } from "../../actions/types";

const Activate = ({
  match,
  error,
  isAuthenticated,
  history,
  activate,
  clearErrors,
}) => {
  const [msg, setMsg] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const { token } = match.params;
    activate({ token });
  };

  useEffect(() => {
    if (error.id === ACTIVATE_FAIL) {
      setMsg(error.msg.error);
    } else {
      setMsg(null);
    }

    if (isAuthenticated) {
      history.push("/login");
    }
  }, [error, isAuthenticated, history]);

  return (
    <div>
      {!msg ? (
        <p className="text-center">
          Welcome! Click button below to activate your account.
        </p>
      ) : (
        <p className="text-center">
          <span className="text-danger">{msg}</span>
        </p>
      )}
      <form className="text-center" onSubmit={onSubmit}>
        <input type="submit" value="Activate" className="btn btn-primary" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { activate, clearErrors })(Activate);
