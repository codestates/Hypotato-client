import React from "react";
import "./Signin.css";
import potatoLogo from "../image/potato.png";
import axios from 'axios';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
    };

    this.signInHandler = this.signInHandler.bind(this);
  }

  signInHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { signUpButtonHander, goToFieldHander } = this.props;
    const { email, passWord } = this.state;
    return (
      <>
        <div className="sigin_main">
          <div className="signin_title">hypotato</div>
          <div className="signin_subtitle">How is your potato?</div>
          <img
            className="signin_potato"
            src={potatoLogo}
            alt="이미지를 찾을 수 없음"
          />
        </div>

        <div className="signin_modal">
          <div>
            <div className="sign_email">Email</div>
            <input
              className="signin_input_mail"
              name="email"
              type="text"
              value={email}
              onChange={this.signInHandler}
            />
          </div>

          <div>
            <div className="sign_password">Password</div>
            <input
              className="signin_input_pw"
              name="passWord"
              type="password"
              value={passWord}
              maxLength="14"
              onChange={this.signInHandler}
            />
          </div>
          <div>
            <button className="sign_google">connect with google</button>
          </div>
          <div className="buttons">
            <button className="sign_signin" onClick={goToFieldHander} >
              Sign IN
            </button>
            <button onClick={signUpButtonHander} className="sign_signup">
              Sign UP
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
