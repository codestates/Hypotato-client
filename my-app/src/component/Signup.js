import React from "react";
import "./Signup.css";
import potatoLogo from "../image/potato.png";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: "",
      email: "",
      passWord: "",
      inspect: "",
      differ: false,
      pwCheck: true,
    };

    this.nickChecker = this.nickChecker.bind(this);
    this.emailChecker = this.emailChecker.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
    this.signUpRequestHanlder = this.signUpRequestHanlder.bind(this);
  }

  nickChecker() {
    // 닉네임 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
  }

  emailChecker() {
    // 이메일 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
  }

  signUpHandler(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  signUpRequestHanlder() {
    const { nickName, passWord, email, inspect } = this.state;
    // if (!passWord.match("^(?=.*[@$!%*?&])[@$!%*?&]{8,}$")) {
    //   this.setState({ pwCheck: false });
    // }

    if (passWord !== inspect) {
      this.setState({ differ: true });
    } else {
      // 서버에 사인업 axios 요청.
      axios({
        method: "post",
        url: `https://hypotatoserveertest1.herokuapp.com/signup`,
        data: { email: email, nickname: nickName, password: passWord },
      }).then((res) => console.log(res));
    }
  }

  render() {
    const { nickName, email, passWord, inspect } = this.state;
    return (
      <div className="signup_body">
        <div className="signup_main">
          <img
            className="signup_potato"
            src={potatoLogo}
            alt="이미지를 찾을 수 없음"
          />
          <div className="signup_title">hypotato</div>
          <div className="signup_subtitle">How is your potato?</div>
        </div>

        <div className="signup_modal">
          <div>
            <div className="signup_nickname">Nick Name</div>
            <input
              className="signup_input"
              name="nickName"
              type="text"
              value={nickName}
              maxLength="8"
              onChange={this.signUpHandler}
            />
            <button onClick={this.nickChecker} className="nickname_check">
              check
            </button>
          </div>

          <div>
            <div className="signup_email">Email</div>
            <input
              className="signup_input"
              name="email"
              type="text"
              value={email}
              onChange={this.signUpHandler}
            />
            <button onClick={this.emailChecker} className="email_check">
              check
            </button>
          </div>

          <div>
            <div className="sign_password">Password</div>
            <div>
              <input
                className="signup_pw"
                name="passWord"
                type="password"
                value={passWord}
                maxLength="14"
                onChange={this.signUpHandler}
              />
            </div>
            <input
              className="signup_pw"
              name="inspect"
              type="password"
              value={inspect}
              maxLength="14"
              onChange={this.signUpHandler}
            />
            {this.state.differ ? (
              <div className="pw-differ"> 비밀번호가 다릅니다. </div>
            ) : (
              ""
            )}

            {!this.state.pwCheck ? (
              <div className="pw-check">비밀번호 형식이 맞지 않습니다.</div>
            ) : (
              ""
            )}
          </div>

          <button onClick={this.signUpRequestHanlder} className="signup_button">
            Sign UP
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
