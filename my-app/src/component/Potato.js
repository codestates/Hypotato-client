import React, { Component } from "react";
import "./Potato.css";
import potatoLogo from "../image/potato.png";

class Potato extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="potato_component_body">
      <div className="potato_component_body_left">
        <img className="potato_component_body_left_image" src={potatoLogo} alt=""/>
      </div>
      <div className="potato_component_body_right">
        <div className="potato_component_body_right_potato-url">www.google.com</div>
        <div className="potato_component_body_right_potato-desc">이 웹사이트는 구글에 접속할 수 있는 웹사이트 입니다.</div>
      </div>
    </div>;
  }
}

export default Potato;
