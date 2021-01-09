import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      name: "",
      password: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const loginDetails = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    };

    axios
      .get(`http://localhost:5000/users/${loginDetails.email}`)
      .then((res) => alert("Account already exists. You can proceed to login."))
      .catch((error) => console.log(error));

    axios
      .post("http://localhost:5000/auth/register", loginDetails)
      .then((res) => {
        alert("Successfully registered. You can proceed to login.");
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
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
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
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
        <div className="btn btn-warning">
          <Link to="/login" className="nav-link">
            Login here
          </Link>
        </div>
      </div>
    );
  }
}
