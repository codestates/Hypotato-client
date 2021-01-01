import React, { Component } from "react";
import "./Potato.css";
import potatoLogo from "../image/potato.png";
import axios from "axios";
// import { Link } from "react-router-dom";

class Potato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potatos: [
        {
          url: "https://ko.reactjs.org/docs/handling-events.html",
          inform: "구글 웹사이트 입니다",
        },
        {
          url: "www.naver.com",
          inform: "네이버 웹사이트 입니다",
        },
        {
          url: "www.yahoo.co.kr",
          inform: "야후 웹사이트 입니다",
        },
        {
          url: "www.daum.net",
          inform: "다음 웹사이트 입니다",
        },
      ],
      // newPotatos: this.props.location.state,
    };
    this.addPotatoHandler = this.addPotatoHandler.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
  }

  addPotatoHandler() {
    const { potatos, newPotatos } = this.state;

    // this.setState({
    //   potatos: [...potatos, newPotatos],
    // });
    console.log("여기는 potato.js 43번째 줄", this.props.location.state);
    this.props.history.push("/addpotato", {
      ...this.props.location.state,
    });
  }

  goToMyPage() {
    console.log(1);
    this.props.history.push("/mypage");
  }

  goToInstruction() {
    this.props.history.push("/instruction");
  }

  signOutHandler() {
    // axios({
    //   method: "post",
    //   url: `https://hypotato.com/signout`,
    //   withCredentials: true,
    // }).then(() => {
    //   this.props.history.push("/");
    // });
    this.props.history.push("/");
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

  render() {
    console.log("이게 넘어올까?", this.props.location.state);
    const potatoes = this.props.location.state.potatoes;
    console.log(potatoes);
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
          <div className="field_right_fields">
            {" "}
            <div className="field_right_bar">
              {" "}
              <button
                className="field_right_potato_add_btn"
                onClick={this.addPotatoHandler}
              >
                감자 추가
              </button>
              <button className="field_right_potato_remove_btn">
                감자 삭제
              </button>
              <button className="field_right_potato_show-all_btn">
                모든 감자
              </button>
              <button className="field_right_potato_show-bad_btn">
                썩은 감자
              </button>
            </div>
            <div className="field_right_potato_contents">
              <div className="potato_component">
                {potatoes.map((el) => (
                  <div key={el.id} className="potato_component_body">
                    <div className="potato_component_body_left">
                      <img
                        className="potato_component_body_left_image"
                        src={potatoLogo}
                        alt=""
                      />
                    </div>
                    <div className="potato_component_body_right">
                      <div className="potato_component_body_right_potato-url">
                        <span className="potato_component_body_right_potato-url_text">
                          <a
                            href={el.potatoName}
                            target="_blank"
                            className="link"
                          >
                            {el.potatoName}
                          </a>
                        </span>
                      </div>
                      <div className="potato_component_body_right_potato-desc">
                        <span className="potato_component_body_right_potato-desc_text">
                          {el.potatoDesc}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Potato;
