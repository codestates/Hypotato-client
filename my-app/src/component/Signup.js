import React from "react";
import "./Signup.css";
import potatoLogo from "../image/potato.png";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      password: "",
      inspect: "",
      differ: false,
      pwCheck: true,
      nicknameChk: false,
      emailChk: false,
      confirmNickname: "",
      confirmEmail: "",
    };

    this.nicknameChecker = this.nicknameChecker.bind(this);
    this.emailChecker = this.emailChecker.bind(this);
    this.formInputValue = this.formInputValue.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this);
  }

  nicknameChecker() {
    this.setState({
      confirmNickname: this.state.nickname,
    });
    // 닉네임 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
    axios({
      method: "post",
      url: `https://www.hypotato.com/signup`,
      data: { nickname: this.state.nickname, chk: "nicknameChk" },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.chkNickname === "nicknameOk") {
          this.setState({
            nicknameChk: true,
          });
          alert("사용가능한 닉네임입니다.");
        }
      })
      .catch(() => {
        this.setState({
          nicknameChk: false,
        });
        alert("중복되는 닉네임이 있습니다. 닉네임을 변경해주세요.");
      });
  }

  emailChecker() {
    this.setState({
      confirmEmail: this.state.email,
    });
    // 이메일 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
    axios({
      method: "post",
      url: `https://www.hypotato.com/signup`,
      data: { email: this.state.email, chk: "emailChk" },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.chkEmail === "emailOk") {
          this.setState({
            emailChk: true,
          });
          alert("확인되었습니다.");
        }
      })
      .catch(() => {
        alert("중복되는 이메일이 있습니다. 다른 이메일을 입력해주세요.");
        this.setState({
          emailChk: false,
        });
      });
  }

  formInputValue(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  signUpSubmit() {
    const {
      nickname,
      password,
      email,
      inspect,
      nicknameChk,
      emailChk,
      confirmNickname,
      confirmEmail,
    } = this.state;
    // if (!password.match("^(?=.*[@$!%*?&])[@$!%*?&]{8,}$")) {
    //   this.setState({ pwCheck: false });
    // }

    if (password !== inspect) {
      this.setState({ differ: true });
    } else if (
      nickname === confirmNickname &&
      email === confirmEmail &&
      nicknameChk &&
      emailChk
    ) {
      axios({
        method: "post",
        url: `https://www.hypotato.com/signup`,
        data: { email: email, nickname: nickname, password: password },
        withCredentials: true,
      }).then(() => {
        this.props.history.push("/");
      });
    } else {
      alert("닉네임 또는 이메일 중복검사를 실행해주세요.");
    }
  }

  render() {
    const { nickname, email, password, inspect } = this.state;
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
              name="nickname"
              type="text"
              value={nickname}
              maxLength="8"
              onChange={this.formInputValue}
            />
            <button onClick={this.nicknameChecker} className="nickname_check">
              check
            </button>
          </div>

          <div>
            <div className="signup_email">Email</div>
            <input
              className="signup_input"
              name="email"
              type="email"
              value={email}
              onChange={this.formInputValue}
            />
            <button onClick={this.emailChecker} className="email_check">
              check
            </button>
          </div>

          <div>
            <div className="sign_password">password</div>
            <div>
              <input
                className="signup_pw"
                name="password"
                type="password"
                value={password}
                maxLength="14"
                onChange={this.formInputValue}
              />
            </div>
            <input
              className="signup_pw"
              name="inspect"
              type="password"
              value={inspect}
              maxLength="14"
              onChange={this.formInputValue}
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

          <button onClick={this.signUpSubmit} className="signup_button">
            Sign UP
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
