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
    axios({
      method: "post",
      url: `https://3.133.83.100:4000/signin`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: { email: email, password: passWord },
    }).then((res) => {
      console.log("로그인 후 = ", res);

      return axios({
        method: "get",
        url: `https://3.133.83.100:4000/userinfo`,
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

    // const { email, passWord } = this.state;
    // axios({
    //   method: "post",
    //   url: `http://3.133.83.100:4000/signin`,
    //   headers: { "Content-Type": "application/json" },
    //   withCredentials: true,
    //   data: { email: email, password: passWord },
    // })
    //   .then((res) => {
    //     console.log("로그인 후 = ", res);
    //   })
    //   .then(() => {
    //     return axios({
    //       method: "get",
    //       url: `http://3.133.83.100:4000/userinfo`,
    //       withCredentials: true,
    //     }).then((userinfo) => {
    //       console.log("userinfo 입니다 = ", userinfo);
    //     });
    //     // .then(() => {
    //     //   this.setState({ goToField: true });
    //     // })
    //     // .catch((err) => console.log(err));
    //   });

    // this.setState({
    //   goToField: true,
    // });
  }

  render() {
    const { isLogin, signup, goToField } = this.state;
    return (
      <div className="body">
        {goToField ? (
          <Farm />
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
