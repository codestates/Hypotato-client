import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import "./Mypage.css";

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        nickName: "이종원",
        email: "per1215@naver.com",
        fieldInfo:
          "이내용은 어쩌구 저쩌구 강장공장 공장장은 강 장장ㅈ입니다라가ㅗ 하다가 경찰청 창살은 철창상이라고 말하면 여튼 렌더해야하는까 그냥 아무말이나 짖거리는거임",
      },
    };
  }
  render() {
    const { nickName, email, fieldInfo } = this.state.userInfo;
    return (
      <>
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
            <div className="field_right_fields, test">
              <div className="mypage_nickname">
                <div className="mypage_nickname_key">Nick Name</div>
                <div className="mypage_nickname_value">{nickName}</div>
              </div>
              <div className="mypage_email">
                <div className="mypage_email_key">Email</div>
                <div className="mypage_email_value">{email}</div>
              </div>
              <div className="mypage_info">
                <div className="mypage_info_key">Field Info</div>
                <div className="mypage_info_value">{fieldInfo}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mypage;
