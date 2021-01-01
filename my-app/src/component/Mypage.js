import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import fieldImage from "../image/field.png";
import tresh from "../image/tresh.png";
import axios from "axios";
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
    };

    this.goToField = this.goToField.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.goToEditInfo = this.goToEditInfo.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  goToField() {
    axios({
      method: "get",
      url: ` https://hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      this.setState({ isFieldClicked: false });
      this.props.history.push("/field", { ...userInfo.data.data }); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
    });
  }

  goToMyPage() {
    this.props.history.push("/mypage"); // 마이페이지 안에서 마이페이지로가는 클릭 이벤트를 만든 이유: 그냥 눌러보는 user들이 있기 때문.
  }

  goToInstruction() {
    this.props.history.push("/instruction");
  }

  goToEditInfo() {
    this.props.history.push("/editinfo");
  }

  signOutHandler() {
    axios({
      method: "post",
      url: `https://hypotato.com/signout`,
      withCredentials: true,
    }).then(() => {
      this.props.history.push("/");
    });
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
              <div
                className="field_right_menu_mypage"
                onClick={this.goToMyPage}
              >
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
            <div className="field_right_fields, test">
              <button className="mypage_edit_info" onClick={this.goToEditInfo}>
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
                    <div className="mypage_info_field_entire">
                      <img
                        className="mypage_info_field_logo"
                        src={fieldImage}
                        alt=""
                        width="160px"
                        height="100px"
                      />
                      <div className="mypage_info_field_value">
                        {" "}
                        = {fieldInfo.field}
                      </div>
                    </div>
                    <div className="mypage_info_potato_entire">
                      <img
                        src={potatoLogo}
                        alt=""
                        width="100px"
                        height="100px"
                      />
                      <div className="mypage_info_potato_value">
                        {" "}
                        = {fieldInfo.goodPotato}
                      </div>
                    </div>
                    <div className="mypage_info_tresh_entire">
                      <img
                        className="mypage_info_tresh_logo"
                        src={tresh}
                        alt=""
                        width="75px"
                        height="110px"
                      />
                      <div className="mypage_info_tresh_value">
                        {" "}
                        = {fieldInfo.badPotato}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Mypage;
