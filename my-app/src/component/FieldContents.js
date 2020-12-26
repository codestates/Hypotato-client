import React, { Component } from "react";
import Emoji from "./Emoji";
import "./FieldContents.css";
import fieldImage from "../image/field.png";
// import potatoLogo from "../image/small_potato_logo.png";

class FieldContents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
  }

  render() {
    return (
      <div onClick={this.props.potatoRenderHandler} className="field_content">
        <img
          className="field_image"
          src={fieldImage}
          alt="이미지를 찾을 수 없습니다."
        />
        <div className="field_name">
          <span className="field_name_key">밭 이름</span>
          <span className="field_name_value"> {this.props.fieldName} </span>
        </div>

        <div className="field_desc">
          <span className="field_desc_key">밭 설명</span>
          <span className="field_desc_value"> {this.props.fieldDesc}</span>
        </div>

        <div className="field_summary_category">
          <span className="field_summary_category_key">카테고리</span>
          <span className="field_summary_category_value">
            {this.props.category}
          </span>
        </div>

        <div className="field_potato_summary">
          <span className="field_potato_summary_emoji">
            <Emoji emoji="🥔" />
          </span>
          <span className="field_potato_summary_count">
            : {this.props.potatoCount}
          </span>
        </div>
      </div>
    );
  }
}

export default FieldContents;
