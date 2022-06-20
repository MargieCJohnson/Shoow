import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { signIn, signInWithGoogle } from "../../Firebase/UserUtils";
import { errorToast, successToast } from "../../toast";
import { SignedIn } from "../UserState/UserState";
import "./SignUpPage.scss";
import Seo from "../Seo";


class LogInPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    email: "",
    password: "",
  };

  signInClick = event => {
    event.preventDefault();
    const { email, password } = this.state;
    signIn(email, password).catch(error => {
      errorToast(error.message);
    });
  };

  handleChange = event => {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
    if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  };


  render() {
    const { email, password } = this.state;
    return (
      <div className="container signup-page">
      <Seo 
        title="Login"
        descriptions="Login to unlocked more features in the website!"
        />
        <SignedIn>{() => <Redirect to="/" />}</SignedIn>
            <div className="login">
              <div className="login__content">
                  <div className="login__forms">
                      <form onSubmit={this.signInClick} className="login__registre">
                        <h1 className="login__title">Sign In</h1>
                        <div class="g-sign-in-button" onClick={signInWithGoogle}>
    <div class="content-wrapper">
        <div class="logo-wrapper">
            <img src="https://i.ibb.co/ynC7Stq/5847f9cbcef1014c0b5e48c8.png" />
        </div>
      <span class="text-container">
      <span>Sign in with Google</span>
    </span>
    </div>
    </div>
                        <div className="login__box">
                            <svg width="17" height="17" viewBox="0 0 24 24"><path d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z"/></svg>
                            <input value={email} onChange={this.handleChange} type="email" placeholder="Email" className="login__input" required/>
                        </div>
    
                        <div className="login__box">
                            <svg width="17" height="17" viewBox="0 0 24 24"><path d="M16 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0-2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-5.405 16.4l-1.472 1.6h-3.123v2h-2v2h-2v-2.179l5.903-5.976c-.404-.559-.754-1.158-1.038-1.795l-6.865 6.95v5h6v-2h2v-2h2l2.451-2.663c-.655-.249-1.276-.562-1.856-.937zm7.405-11.4c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"/></svg>
                            <input type="password" value={password} onChange={this.handleChange} placeholder="Password" className="login__input" required/>
                        </div>

                        <Link to="/forgot_password" className="login__forgot">Forgot password?</Link>

                        <button className="login__button">Log In</button>

                        <div>
                          <span class="login__account">Don't have an account? </span>
                            <Link to="/signup"><span class="login__signin" id="sign-up">Sign Up</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LogInPage);
