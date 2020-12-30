import React from "react";
import "./Signin.css";
import potatoLogo from "../image/potato.png";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
    };

    this.signInHandler = this.signInHandler.bind(this);
    this.goToFarmHander = this.goToFarmHander.bind(this);
    this.signUpButtonHander = this.signUpButtonHander.bind(this);
  }

  signInHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  goToFarmHander() {
    // const { email, passWord } = this.state;
    // console.log(email, passWord);
    // axios({
    //   method: "post",
    //   url: `https://3.133.83.100:4000//signin`,
    //   headers: { "Content-Type": "application/json" },
    //   withCredentials: true,
    //   data: { email: email, password: passWord },
    // }).then((res) => {
    //   console.log("로그인 후 = ", res);
    //   axios({
    //     method: "get",
    //     url: `https://3.133.83.100:4000//userinfo`,
    //     withCredentials: true,
    //   })
    //     .then((userinfo) => {
    //       console.log("userinfo 입니다 = ", userinfo);
    //     })
    //     .then(() => {
    //       this.setState({ goToField: true });
    //     })
    //     .catch((err) => console.log(err));
    // });
    this.props.history.push("/field"); // 나중에 이 명령을 axios요청 성공시 작동할 수 있도록 then() 안으로 옮겨야 함.
  }

  signUpButtonHander() {
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
            <button className="sign_signin" onClick={this.goToFarmHander} >
              Sign IN
            </button>
            <button onClick={this.signUpButtonHander} className="sign_signup">
              Sign UP
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
