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
        <div className="field_left">
          <div className="field_profile">
            <img
              className="field_profile_photo"
              src={potatoLogo}
              alt="이미지를 찾을 수 없습니다."
            />
          </div>
          <div className="field_potato_count">
            <div className="field_potato_count_good">정상 감자 개수 : 0</div>
            <div className="field_potato_count_bad">썩은 감자 개수 : 0</div>
          </div>
          <div className="field_categories">
            <div className="field_categories_all">전체</div>
            <div className="field_categories_dev">개발</div>
            <div className="field_categories_travel">여행</div>
            <div className="field_categories_cook">요리</div>
          </div>
        </div>
        <div className="field_right">
          <div className="field_right_menu">
            <div className="field_right_menu_mypage">마이페이지</div>
            <div className="field_right_menu_manual">사용 설명서</div>
            <div className="field_right_menu_logout">로그아웃</div>
          </div>
          <div className="field_right_fields"></div>
        </div>
      </div>
    );
  }
}
export default Field;
