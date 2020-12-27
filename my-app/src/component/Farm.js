import React from "react";
import Field from "./Field";
import Mypage from "./Mypage";
// import "./Field.css";
// import potatoLogo from "../image/potato.png";

class Farm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPage: false,
    };
    this.goToMyPage = this.goToMyPage.bind(this);
  }

  goToMyPage() {
    this.setState({
      myPage: true,
    });
  }

  render() {
    const { myPage } = this.state;
    return myPage ? <Mypage /> : <Field goToMyPage={this.goToMyPage} />;
  }
}
export default Farm;
