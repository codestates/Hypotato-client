import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import "./EditInfo.css";

class EditInfo extends Component {
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
            <div
              className="field_right_menu_mypage"
              onClick={this.props.goToMyPage}
            >
              마이페이지
            </div>
            <div className="field_right_menu_manual">사용 설명서</div>
            <div className="field_right_menu_logout">로그아웃</div>
          </div>
          <div className="field_right_fields, edit_main">
            <div className="edit_model">
              <div className="edit_name_key">Nick Name</div>
              <div className="edit_name_row">
                <input className="edit_name_value" type="text" />
                <button className="edit_name_check">check</button>
              </div>
              <div className="edit_password_key">Password</div>
              <input type="text" className="edit_password_value" />
              <input type="text" className="edit_password_check" />
              <button className="edit_info_Confirm">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditInfo;
