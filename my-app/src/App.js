import React, { Component } from "react";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Farm from "./component/Farm";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      signup: false, // 사인업버튼 클릭되면 true로 바뀌게
      goToField: false,
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
    this.setState({
      goToField: true,
    });
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
            goToFieldHander={this.goToFieldHander}
            signUpButtonHander={this.signUpButtonHander}
          />
        )}
      </div>
    );
  }
}

export default App;
