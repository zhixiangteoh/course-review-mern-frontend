import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const loginDetails = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .get(`http://localhost:5000/users/${loginDetails.email}`)
      .then((res) => console.log(res))
      .catch((error) =>
        alert("Email does not exist! Please register before logging in.")
      );

    axios
      .post("http://localhost:5000/auth/login", loginDetails)
      .then((res) => {
        this.props.sendToken(res.data.token);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
        <div className="btn btn-warning">
          <Link to="/register" className="nav-link">
            New? Register here!
          </Link>
        </div>
      </div>
    );
  }
}
