import React, { Component } from "react";
import Signin from "./component/Signin";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  render() {
    return (
      <div className="body">
        <Signin />
      </div>
    );
  }
}

export default App;
