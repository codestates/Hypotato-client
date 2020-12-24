import React from "react";
import "./Field.css";
import potatoLogo from "../image/potato.png";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="field_entire">
        <div className="field_profile">
          <img
            className="field_profile_photo"
            src={potatoLogo}
            alt="이미지를 찾을 수 없습니다."
          />
        </div>

        <div className="field_potato_count">
          <div className="field_potato_count_good">현재 감자 개수: 0개 </div>
          <div className="field_potato_count_bad">썪은 감자 개수: 0개 </div>
        </div>

        <div className="field_categories">
          <div>IT</div>
          <div>운동</div>
          <div>요리</div>
          <div>여행</div>
        </div>
        <div className="field_body">
          <div>밭 콤포넌트 들이 들어갈 자리</div>
        </div>
      </div>
    );
  }
}
export default Field;
