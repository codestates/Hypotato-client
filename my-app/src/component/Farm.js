import React from "react";
import Field from "./Field";
import { Route, Switch } from "react-router-dom";
import Mypage from "./Mypage";
import Instruction from "./Instruction";
// import "./Field.css";
// import potatoLogo from "../image/potato.png";

class Farm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPage: false,
      goToInstruction: false,
    };
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
  }

  goToInstruction() {
    this.setState({
      goToInstruction: true,
    });
  }

  goToMyPage() {
    this.setState({
      myPage: true,
    });
  }

  render() {
    const { myPage, goToInstruction } = this.state;
    return (
      <>
      </>
    );
  }
}
export default Farm;
