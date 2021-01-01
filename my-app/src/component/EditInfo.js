import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import axios from "axios";
import "./EditInfo.css";

class EditInfo extends Component {
  constructor(props) {
    super(props);

    this.goToMyPage = this.goToMyPage.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.nicknameChecker = this.nicknameChecker.bind(this);
    // this.confirmChecker = this.confirmChecker.bind(this)
  }

  goToField() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    })
    .then(
      (userInfo) => {
        this.props.history.push("/field", {...userInfo.data.data}); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
      }
    )
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

  signOutHandler() {
    axios({
      method: "post",
      url: `https://hypotato.com/signout`,
      withCredentials: true,
    }).then(() => {
      this.props.history.push("/");
    });
  }

  goToInstruction() {
    this.props.history.push("/instruction");
  }

  nicknameChecker() {
    // 닉네임 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
    axios({
      method: "post",
      url: `https://hypotato.com/signup`,
      data: { nickname: this.state.nickname, chk: "nicknameChk" },
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.chkNickname);
      if (res.data.chkNickname === "nicknameOk") {
        this.setState({
          nicknameChk: true,
        });
        alert("사용가능한 닉네임입니다.");
      } else {
        alert("중복되는 닉네임이 있습니다.");
      }
    });
  }

  /*
  confirmChecker() {
    axios({
      method: "put",
      url: `https://hypotato.com/update`,
      data: { nickname: this.state.nickname, password: this.state.password },
      withCredentials: true,
    }) 
    .then(() => {
     alert('변경이 완료되었습니다.')
     })
    }
  */

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
                <button
                  className="edit_name_check"
                  onClick={this.nicknameChecker}
                >
                  check
                </button>
              </div>
              <div className="edit_password_key">Password</div>
              <input type="text" className="edit_password_value" />
              <input type="text" className="edit_password_check" />
              <button
                className="edit_info_Confirm"
                onClick={this.confirmChecker}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditInfo;
