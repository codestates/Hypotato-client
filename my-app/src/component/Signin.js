import React from "react";
import "./Signin.css";
import potatoLogo from "../image/potato.png";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.formInputValue = this.formInputValue.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
  }

  formInputValue(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  signInSubmit() {
    const { email, passWord } = this.state;
    console.log(email, passWord);
    axios({
      method: "post",
      url: ` https://www.hypotato.com/signin`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: { email: email, password: passWord },
    }).then((res) => {
      console.log("로그인 후 = ", res);
      axios({
        method: "get",
        url: ` https://www.hypotato.com/userinfo`,
        withCredentials: true,
      })
        .then((userinfo) => {
          console.log("userinfo 입니다 = ", userinfo.data.data);
          this.props.history.push("/field", {...userinfo.data.data}); 
        })
        .catch((err) => console.log(err));
    });

    // this.props.history.push("/field"); // Axios 요청 없이 테스트 할 때, 
  }

  signUpPage() {
    this.props.history.push("/signup");
  }

  render() {
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
              type="email"
              value={email}
              onChange={this.formInputValue}
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
              onChange={this.formInputValue}
            />
          </div>
          <div>
            <button className="sign_google">connect with google</button>
          </div>
          <div className="buttons">
            <button className="sign_signin" onClick={this.signInSubmit}>
              Sign IN
            </button>
            <button onClick={this.signUpPage} className="sign_signup">
              Sign UP
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
