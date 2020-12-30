import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import "./EditInfo.css";

class EditInfo extends Component {
  constructor(props) {
    super(props);

    this.goToMyPage = this.goToMyPage.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
  }

  goToMyPage() {
    this.props.history.push("/mypage");
  }

  goToField() {
    this.props.history.push("/field");
  }

  signOutHandler() {
    this.props.history.push("/");
  }

  goToInstruction() {
    this.props.history.push("/instruction");
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
              onClick={this.goToField}
            />
          </div>
          <div className="field_potato_count">
            <div className="field_potato_count_good">정상 감자 개수 : 0</div>
            <div className="field_potato_count_bad">썩은 감자 개수 : 0</div>
          </div>
          <div className="field_categories">
            <div className="field_categories_title">카테고리</div>
            <div className=" field_categories_table">
              <div className="field_categories_all">전체</div>
              <div className="field_categories_dev">개발</div>
              <div className="field_categories_travel">여행</div>
              <div className="field_categories_cook">요리</div>
            </div>
          </div>
        </div>
        <div className="field_right">
          <div className="field_right_menu">
            <div className="field_right_menu_mypage" onClick={this.goToMyPage}>
              마이페이지
            </div>
            <div
              className="field_right_menu_manual"
              onClick={this.goToInstruction}
            >
              사용 설명서
            </div>
            <div
              className="field_right_menu_logout"
              onClick={this.signOutHandler}
            >
              로그아웃
            </div>
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
