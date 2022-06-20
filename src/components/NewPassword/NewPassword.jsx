import React, { Component } from "react";
import { resetPassword } from "../../Firebase/UserUtils";
import { successToast, errorToast } from "../../toast";
import "./NewPassword.scss";

class NewPassword extends Component {
  state = {
    email: "",
  };

  handleChange = event => {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
  };

  retrievePasswordClick = event => {
    event.preventDefault();
    const { email } = this.state;
    resetPassword(email)
      .then(() => {
        successToast(`An email to ${email} has been sent`);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  render() {
    return (
      <div id="new-password" className="container">
        <div class="reset-title">Password Reset</div>
        <p>Enter your email below to reset your password</p>
        <div class="login__forms">
        <form onSubmit={this.retrievePasswordClick}>
        <div className="reset-box">
          <input
            class="login__input"
            id="email-bar"
            className="emailReset"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          </div>
          <br />
          <button class="login__button">Reset Password</button>
        </form>
        </div>
      </div>
    );
  }
}

export default NewPassword;
