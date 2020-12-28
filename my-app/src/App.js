import React, { Component } from "react";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Farm from "./component/Farm";
import "./App.css";
import "./reset.css";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      signup: false, // 사인업버튼 클릭되면 true로 바뀌게
      goToField: false,
      myInfo: "",
    };

    this.login = this.login.bind(this);
    this.signUpButtonHander = this.signUpButtonHander.bind(this);
    this.goToFieldHander = this.goToFieldHander.bind(this);
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
    axios({
      method: "post",
      url: `https://hypotatoserveertest1.herokuapp.com/signin`,
      data: { email: email, password: passWord },
    })
    .then(
      (res) => console.log(res)
      )
    .then(
      axios({
        method: "get",
        url: `https://hypotatoserveertest1.herokuapp.com/userinfo`,
      })
    )
    .then(res => console.log(res))
    .then(
      this.setState({
        goToField: true,
      })
    )
    .catch(
      err => console.log(err)
      );
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
            goToFieldHander={this.goToFieldHander}
            signUpButtonHander={this.signUpButtonHander}
          />
        )}
      </div>
    );
  }
}

export default App;
