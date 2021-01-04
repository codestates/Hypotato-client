import React from "react";
import "./Signin.css";
import potatoLogo from "../image/potato.png";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import dotenv from "dotenv";
import { Redirect } from "react-router-dom";
dotenv.config();

class Signin extends React.Component {
  constructor(props) {
    super(props);

    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function (event) {
    //   window.history.go(1);
    // };

    this.state = {
      email: "",
      password: "",
      userinfo: null,
    };

    this.formInputValue = this.formInputValue.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
    this.responseFailed = this.responseFailed.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  formInputValue(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  signInSubmit() {
    const { email, password, userinfo } = this.state;
    // 인수님 사랑해요!
    axios({
      method: "post",
      url: `https://www.hypotato.com/signin`,
      data: { email, password },
      withCredentials: true,
    })
      .then((res) => {
        axios({
          method: "get",
          url: `https://www.hypotato.com/userinfo`,
          withCredentials: true,
        })
          .then((userinfo) => {
            this.props.history.push("/field", { ...userinfo.data.data });
            this.props.classNameChanger(); // 배경화면 애니메이션을 끄도록 클래스네임을 토글하는 메소드 App.js에서 넘어옴.
          })
          .catch((err) => {
            alert("이메일 또는 비밀번호가 틀렸습니다.");
            window.location.reload();
          });
      })
      .catch((err) => {
        alert("이메일 또는 비밀번호가 틀렸습니다.");
        window.location.reload();
      });
  }

  signUpPage() {
    this.props.history.push("/signup");
  }

  // Goole Login
  responseGoogle(res) {
    axios({
      method: "post",
      url: `https://www.hypotato.com/google/signin`,
      data: {
        nickname: res.profileObj.name,
        email: res.profileObj.email,
        password: res.profileObj.googleId,
      },
      withCredentials: true,
    }).then(() => {
      axios({
        method: "get",
        url: `https://www.hypotato.com/userinfo`,
        withCredentials: true,
      })
        .then((userinfo) => {
          this.props.history.push("/field", { ...userinfo.data.data });
          this.props.classNameChanger(); // 배경화면 애니메이션을 끄도록 클래스네임을 토글하는 메소드 App.js에서 넘어옴.
        })
        .catch((err) => console.log(err));
    });
  }

  //Login Failed
  responseFailed(err) {
    console.log(err);
  }

  render() {
    const { email, password } = this.state;
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
              name="password"
              type="password"
              value={password}
              maxLength="14"
              onChange={this.formInputValue}
            />
          </div>
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseFailed}
              cookiePolicy={"single_host_origin"}
            />
            {/* <button className="sign_google">connect with google</button> */}
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
