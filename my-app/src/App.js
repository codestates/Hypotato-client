import React, { Component } from "react";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Farm from "./component/Farm";
import axios from "axios";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      signup: false, // 사인업버튼 클릭되면 true로 바뀌게
      goToField: false,
      email: "",
      passWord: "",
    };

    this.login = this.login.bind(this);
    this.signUpButtonHander = this.signUpButtonHander.bind(this);
    this.goToFieldHander = this.goToFieldHander.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
  }

  signInHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(this.state);
  }

  login() {
    this.setState({
      isLogin: true,
    });
  }

  signUpButtonHander() {
    this.setState({
      signup: true,
    });
  }

  goToFieldHander() {
    const { email, passWord } = this.state;
    console.log(email, passWord);
    axios({
      method: "post",
      url: `https://hypotatoserveertest1.herokuapp.com/signin`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: { email: email, password: passWord },
    }).then((res) => {
      console.log("로그인 후 = ", res);
      axios({
        method: "get",
        url: `https://hypotatoserveertest1.herokuapp.com/userinfo`,
        withCredentials: true,
      })
        .then((userinfo) => {
          console.log("userinfo 입니다 = ", userinfo);
        })
        .then(() => {
          this.setState({ goToField: true });
        })
        .catch((err) => console.log(err));
    });

    this.setState({
      goToField: true,
    });
  }

  render() {
    const { isLogin, signup, goToField } = this.state;
    return (
      <div className="body">
        {goToField ? (
          <Farm myinfo={this.state.myinfo}/>
        ) : signup ? (
          <Signup />
        ) : (
          <Signin
            signInHandler={this.signInHandler}
            goToFieldHander={this.goToFieldHander}
            signUpButtonHander={this.signUpButtonHander}
          />
        )}
      </div>
    );
  }
}

export default App;
