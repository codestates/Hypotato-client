import React, { Component } from 'react';
import Emoji from "./Emoji"
import "./FieldContents.css";
import fieldImage from "../image/field.png";

class FieldContents extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props);
    }

    render() {
        return(
            <div className="field_content">
                <img className="field_image" src={fieldImage} alt="이미지를 찾을 수 없습니다."/>
                <div className="field_name">밭 이름: {this.props.fieldName}</div>
                <div className="field_desc">밭 설명: {this.props.fieldDesc}</div>
                <div className="field_potato_summary">
                    <Emoji emoji="🥔" />
                    <span className="field_potato_count">: {this.props.potatoCount}</span>
                </div>
                <div className="field_category">카테고리: {this.props.category}</div>
            </div>
        )
    }
}



export default FieldContents;