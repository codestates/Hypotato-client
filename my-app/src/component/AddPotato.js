import React, { Component } from "react";
import potatoLogo from "../image/potato.png";
import "./AddPotato.css";
import axios from "axios";

class AddPotato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      inform: "",
      // category: "",
    };
    this.goToField = this.goToField.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.formTargetValue = this.formTargetValue.bind(this);
    this.formSelectValue = this.formSelectValue.bind(this);
    this.submitNewPotato = this.submitNewPotato.bind(this);
  }

  submitNewPotato() {
    const { url, inform } = this.state;
    const fieldId = this.props.location.state.fieldId;
    axios({
      method: "post",
      url: `https://hypotato.com/potato/add`,
      withCredentials: true,
      data: { potatoName: url, potatoDesc: inform, fieldId: fieldId }, // ES6문법에서 객체의 키값과 벨류값이 같은 경우, 키값 한번만 딱 적어줘도 fieldName: fieldName 이것과 같은 효과를 냄.
    })
      .then(() => {
        axios({
          method: "get",
          url: `https://hypotato.com/field/${fieldId}`,
          withCredentials: true,
        }).then((userinfo) => {
          this.props.history.push("/potato", { ...userinfo.data.data });
        });
      })
      .catch((err) => console.log(err));
    // console.log(this.state);
    // this.props.history.push("/potato", {
    //   url: this.state.url,
    //   inform: this.state.inform,
    //   category: this.state.category,
    // });
  }

  formTargetValue(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  formSelectValue(e) {
    console.log(this.state);
    this.setState({
      category: e.target.value,
    });
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
    this.props.history.push("/mypage");
  }

  goToInstruction() {
    this.props.history.push("/instruction");
  }

  signOutHandler() {
    this.props.history.push("/");
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
          <div className="field_right_fields, inst_main">
            <div className="potato_entire, add_potato_modal">
              <img src={potatoLogo} width="300vh" alt="" />
              <div className="add_potatp_form">
                <div className="add_potato_url">
                  <div className="add_potato_url_key">감자 url</div>
                  <input
                    className="add_potato_url_value"
                    onChange={this.formTargetValue}
                    type="text"
                    name="url"
                    value={this.state.url}
                  />
                </div>
                <div className="add_potato_desc">
                  <div className="add_potato_desc_key">감자 설명</div>
                  <input
                    className="add_potato_desc_value"
                    onChange={this.formTargetValue}
                    type="text"
                    name="inform"
                    value={this.state.inform}
                  />
                </div>
              </div>
              {/* <div>
                <select
                  value={this.state.category}
                  onChange={this.formSelectValue}
                >
                  <option value="it">개발</option>
                  <option value="cook">요리</option>
                  <option value="trip">여행</option>
                </select>
              </div> */}
              <button
                className="add_potato_submit"
                onClick={this.submitNewPotato}
              >
                생성
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPotato;
