import React, { Component } from "react";
import "./Potato.css";
import potatoLogo from "../image/potato.png";

class Potato extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { potatoName, potatoDesc, status } = this.props
    console.log(potatoName, potatoDesc);
    return (
      <div className="potato_component_body">
        <div className="potato_component_body_left">
          <img
            className="potato_component_body_left_image"
            src={potatoLogo}
            alt=""
          />
        </div>
        <div className="potato_component_body_right">
          <div className="potato_component_body_right_potato-url">
            <span className="potato_component_body_right_potato-url_text"> 
            {potatoName}
            </span>
          </div>
          <div className="potato_component_body_right_potato-desc">
            <span className="potato_component_body_right_potato-desc_text">
              {potatoDesc}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Potato;
