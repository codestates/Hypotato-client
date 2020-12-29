import React from "react";
import Field from "./Field";
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
    this.instructionHandler = this.instructionHandler.bind(this);
  }

  instructionHandler() {
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
        {myPage ? (
          <Mypage />
        ) : goToInstruction ? (
          <Instruction />
        ) : (
          <Field
            goToMyPage={this.goToMyPage}
            instructionHandler={this.instructionHandler}
          />
        )}
      </>
    );
  }
}
export default Farm;
