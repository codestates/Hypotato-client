import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import EditInfo from "./EditInfo";
import fieldImage from "../image/field.png";
import "./Mypage.css";

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        nickName: "이종원",
        email: "per1215@naver.com",
        fieldInfo: {
          goodPotato: 10,
          badPotato: 10,
          field: 10,
        },
      },
      goToEdit: false,
    };
    this.editHandler = this.editHandler.bind(this);
  }

  editHandler() {
    this.setState({
      goToEdit: true,
    });
  }

  render() {
    const { nickName, email, fieldInfo } = this.state.userInfo;
    return (
      <>
        {this.state.goToEdit ? (
          <EditInfo />
        ) : (
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
                <div className="field_potato_count_good">
                  정상 감자 개수 : 0
                </div>
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
              <div className="field_right_fields, test">
                <button className="mypage_edit_info" onClick={this.editHandler}>
                  Edit Info
                </button>
                <div className="mypage_contents">
                  <div className="mypage_nickname">
                    <div className="mypage_nickname_key">Nick Name</div>
                    <div className="mypage_nickname_value">" {nickName} "</div>
                  </div>
                  <div className="mypage_email">
                    <div className="mypage_email_key">Email</div>
                    <div className="mypage_email_value">" {email} "</div>
                  </div>
                  <div className="mypage_info">
                    <div className="mypage_info_key">Field Info</div>
                    <div className="mypage_info_value">
                      <div className="mypage_info_potato_entire">
                        <img
                          src={potatoLogo}
                          alt=""
                          width="100px"
                          height="100px"
                        />
                        <div> = {fieldInfo.goodPotato}</div>
                      </div>
                      <div className="mypage_info_field_entire">
                        <img
                          src={fieldImage}
                          alt=""
                          width="200px"
                          height="100px"
                        />
                        <div> = {fieldInfo.field}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Mypage;
