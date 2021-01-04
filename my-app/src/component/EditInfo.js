import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import axios from "axios";
import "./EditInfo.css";
// 92번줄에서 수정하고 나서 field로 가야합니다. 이쪽이 안됩니다! => 95번 줄
// 비밀번호가 서로 다를 때 화면에 나타나는 부분 구현이 필요합니다. => 179번 줄
class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      inspect: "",
      differ: false,
      pwCheck: true,
      nicknameChk: false,
      comfirmNickname: "",
      goodPotato: 0,
      badPotato: 0,
    };

    this.goToMyPage = this.goToMyPage.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.goToBadPotatoes = this.goToBadPotatoes.bind(this);
    this.nicknameChecker = this.nicknameChecker.bind(this);
    this.formInputValue = this.formInputValue.bind(this);
    this.confirmChecker = this.confirmChecker.bind(this);
    this.countPotatoNumber = this.countPotatoNumber.bind(this);
  }

  componentDidMount() {
    this.countPotatoNumber();
  }

  formInputValue(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  countPotatoNumber() {
    const potatoes = this.props.location.state.potatoes;
    let goodPotatoCnt = 0;
    let badPotatoCnt = 0;
    potatoes.map((potato) => {
      if (potato.status === "good") {
        goodPotatoCnt++;
      } else {
        badPotatoCnt++;
      }
    });
    this.setState({
      goodPotato: goodPotatoCnt,
      badPotato: badPotatoCnt,
    });
  }

  goToField() {
    axios({
      method: "get",
      url: `https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      this.props.history.push("/field", { ...userInfo.data.data }); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
    });
  }

  goToMyPage() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      // 👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾this.setState({ isFieldClicked: false });
      this.props.history.push("/mypage", { ...userInfo.data.data });
    });
  }

  signOutHandler() {
    axios({
      method: "post",
      url: `https://www.hypotato.com/signout`,
      withCredentials: true,
    }).then(() => {
      this.props.history.push("/");
      this.props.classNameChanger(); // 로그아웃하면 다시 배경화면을 움직이도록 바꾸게 하는 메소드; App.js로부터 넘어옴
    });
  }

  goToInstruction() {
      const potatoes = this.props.location.state.potatoes; 
      // 사용설명서로 갈 때는 axios요청이 불필요한데, 감자 개수를 카운트 하기 위해, state에 있는 값을 보냄. 
      const {goodPotato, badPotato} = this.state;
      this.props.history.push("/instruction", {goodPotato, badPotato, potatoes});
  }

  goToBadPotatoes() {
    const potatoes = this.props.location.state.potatoes;
    let badpotatoes = [];
    potatoes.forEach((badPotato) => {
      if (badPotato.status === "bad") {
        badPotato.isChecked = false;
        badpotatoes.push(badPotato);
      }
    });
    let badPotatoCount = badpotatoes.length;
    let goodPotatoCount = potatoes.length - badpotatoes.length;

    this.props.history.push("/badpotato", {
      badPotatoes: badpotatoes,
      potatoes: potatoes,
      badPotatoCount: badPotatoCount,
      goodPotatoCount: goodPotatoCount,
    });
  }

  nicknameChecker() {
    this.setState({
      comfirmNickname: this.state.nickname,
    });
    // 닉네임 "check"버튼 눌렀을 때 서버로 중복체크 요청할 수 있는 메소드 만들어야 함.
    axios({
      method: "put",
      url: `https://www.hypotato.com/userinfoupdate`,
      data: { nickname: this.state.nickname, chk: "nicknameChk" },
      withCredentials: true,
    })
      .then((res) => {
        if (
          res.data.chkNickname === "nicknameOk" &&
          this.state.nickname !== ""
        ) {
          alert("사용가능한 닉네임입니다.");
          this.setState({
            nicknameChk: true,
          });
        } else {
          alert("닉네임이 잘못 됬습니다. 닉네임을 변경해 주세요.");
          this.setState({
            nicknameChk: false,
          });
        }
      })
      .catch(() => {
        alert("중복되는 닉네임이 있습니다. 닉네임을 변경해 주세요.");
        this.setState({
          nicknameChk: false,
        });
      });
  }

  confirmChecker() {
    if (
      this.state.comfirmNickname === this.state.nickname &&
      this.state.password !== "" &&
      this.state.nickname !== "" &&
      this.state.password === this.state.inspect
    ) {
      axios({
        method: "put",
        url: `https://www.hypotato.com/userinfoupdate`,
        data: { nickname: this.state.nickname, password: this.state.password },
        withCredentials: true,
      }).then(() => {
        axios({
          method: "get",
          url: `https://www.hypotato.com/userinfo`,
          withCredentials: true,
        }).then((userinfo) => {
          alert("변경이 완료되었습니다.");
          this.props.history.push("/field", { ...userinfo.data.data });
        });
      });
    } else {
      alert("수정 하고 싶은 내용을 확인 해주세요");
    }
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
            <div className="field_potato_count_good">
              정상 감자 개수 : {this.state.goodPotato}
            </div>
            <div onClick={this.goToBadPotatoes} className="field_potato_count_bad">
              썩은 감자 개수 : {this.state.badPotato}
            </div>
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
                <input
                  className="edit_name_value"
                  name="nickname"
                  type="text"
                  value={this.state.nickname}
                  maxLength="100"
                  onChange={this.formInputValue}
                />
                <button
                  className="edit_name_check"
                  onClick={this.nicknameChecker}
                >
                  check
                </button>
              </div>
              <div className="edit_password_key">Password</div>
              <input
                className="edit_password_value"
                name="password"
                type="password"
                value={this.state.password}
                maxLength="14"
                onChange={this.formInputValue}
              />
              <input
                className="edit_password_check"
                name="inspect"
                type="password"
                value={this.state.inspect}
                maxLength="14"
                onChange={this.formInputValue}
              />
              {this.state.differ ? (
                <div className="pw-differ"> 비밀번호가 다릅니다. </div>
              ) : (
                ""
              )}
              {!this.state.pwCheck ? (
                <div className="pw-check">비밀번호 형식이 맞지 않습니다.</div>
              ) : (
                ""
              )}
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
