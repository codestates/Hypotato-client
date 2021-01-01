import React from "react";
import "./Signin.css";
import potatoLogo from "../image/potato.png";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userinfo: null,
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
    const { email, password, userinfo } = this.state;

    axios({
      method: "post",
      url: `https://hypotato.com/signin`,
      data: { email, password },
      withCredentials: true,
    }).then((res) => {
      axios({
        method: "get",
        url: `https://hypotato.com/userinfo`,
        withCredentials: true,
      })
        .then((userinfo) => {
          console.log("userinfo 입니다 = ", userinfo);
          this.props.history.push("/field", { ...userinfo.data.data });
        })
        .catch((err) => console.log(err));
    }); // 나중에 이 명령을 axios요청 성공시 작동할 수 있도록 then() 안으로 옮겨야 함.
  }

  signUpPage() {
    this.props.history.push("/signup");
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
