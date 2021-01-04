import React, { Component } from "react";
import "./Potato.css";
import potatoLogo from "../image/potato.png";
import badpotatoLogo from "../image/bad.png";
import axios from "axios";
// import { Link } from "react-router-dom";

class Potato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldId: "",
      potatoes: "",
      goodPotatoCnt: 0,
      badPotatoCnt: 0,
      // newPotatos: this.props.location.state,
    };
    this.addPotatoHandler = this.addPotatoHandler.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
    this.handleBadPotatoDelete = this.handleBadPotatoDelete.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.countPotatoNumber = this.countPotatoNumber.bind(this);
    this.deleteThisField = this.deleteThisField.bind(this);
    this.handlePotatoDateUpdate = this.handlePotatoDateUpdate.bind(this);
    this.goToBadPotatoes = this.goToBadPotatoes.bind(this);
  }

  componentDidMount() {
    this.setState({ fieldId: this.props.location.state.fieldId });
    this.setState({potatoes: this.props.location.state.potatoes});
    this.countPotatoNumber();
  }

  addPotatoHandler() {
    const { potatoes } = this.props.location.state;
    const {goodPotato, badPotato} = this.props.location.state; // 전체 정상감자, 썪은 감자를 감자 추가하는 페이지까지 보내주기 위한 로직.

    this.props.history.push("/addpotato", {
      fieldId: this.state.fieldId,
      goodPotato, 
      badPotato,
      potatoes
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
      goodPotatoCnt: goodPotatoCnt,
      badPotatoCnt: badPotatoCnt,
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

  goToInstruction() {
     // 사용설명서로 갈 때는 axios요청이 불필요한데, 감자 개수를 카운트 하기 위해, state에 있는 값을 보냄. 
     const {goodPotato, badPotato, potatoes} = this.props.location.state;
     this.props.history.push("/instruction", {goodPotato, badPotato, potatoes });
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

  goToField() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      this.setState({ isFieldClicked: false });
      this.props.history.push("/field", { ...userInfo.data.data }); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
    });
  }

  // <<---------- 감자 삭제하는 로직 --------------->>

  handleAllChecked(event) {
    let potatoes = this.props.location.state.potatoes;
    potatoes.forEach((potato) => (potato.isChecked = event.target.checked));
    this.setState({ potatoes: potatoes });
  }

  handleCheckChildElement(event) {
    let potatoes = this.props.location.state.potatoes;
    potatoes.forEach((badpotato) => {
      if (badpotato.id === Number(event.target.defaultValue))
        badpotato.isChecked = event.target.checked;
    });
    this.setState({ potatoes: potatoes });
  }

  async handleBadPotatoDelete() {
    for (let el of this.state.potatoes) {
      if (el.isChecked) {
        await axios({
          method: "delete",
          url: `https://www.hypotato.com/potato/${el.id}`,
          withCredentials: true,
        });
      }
    }

    axios
      .get(`https://www.hypotato.com/field/${this.state.fieldId}`, {
        withCredentials: true,
      })
      .then((fieldinfo) => {
        const potatoes = fieldinfo.data.data.potatoes;
        potatoes.forEach((potato) => {
          potato.isChecked = false; // 그냥 isChecked 키와 false 벨류를 부여하기 위한 로직.
        });

        this.props.history.push("/potato", { potatoes });

        this.countPotatoNumber();
      });
  }

  // <<---------- 감자 삭제하는 로직 - 여기까지 --------------->>

  // <<---------- 밭을 통째로 삭제하는 로직 --------------->>

  deleteThisField() {
    const { fieldId } = this.state;
    axios({
      method: "delete",
      url: ` https://www.hypotato.com/field/${fieldId}`,
      withCredentials: true,
    }).then(() => {
      axios({
        method: "get",
        url: `https://www.hypotato.com/userinfo`,
        withCredentials: true,
      }).then((userinfo) => {
        this.props.history.push("/field", { ...userinfo.data.data });
      });
    });
  }

  // 감자 상태 변경 (날짜와 상태 업데이트)
  handlePotatoDateUpdate(event) {
    const { value } = event.target.attributes[3];

    // 날짜 포맷 (2021-01-03 08:07:03)
    let date = new Date();
    date.setHours(date.getHours() + 9);

    let updatePotatoDate = date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    axios
      .put(
        `https://www.hypotato.com/potato/potatus/${value}`,
        {
          lastClickAt: updatePotatoDate,
          status: "good",
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        axios
          .get(`https://www.hypotato.com/field/${this.state.fieldId}`, {
            withCredentials: true,
          })
          .then((fieldinfo) => {
            const potatoes = fieldinfo.data.data.potatoes;
            potatoes.forEach((potato) => {
              potato.isChecked = false;
            });

            this.props.history.push("/potato", { potatoes });

            this.countPotatoNumber();
          });
      });
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

  render() {
    const {potatoes, fieldId, cameFromAddPotato} = this.props.location.state;
    const filteredPotatoes = cameFromAddPotato ? potatoes : potatoes.filter( potato => potato.fieldId === fieldId ); // 감자 추가 페이지에서 오면 그냥 potatoes를 아니면 필등아이디와 매칭되는 감자만 뽑는 로직.
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
              정상 감자 개수 : {this.state.goodPotatoCnt}
            </div>
            <div onClick={this.goToBadPotatoes} className="field_potato_count_bad">
              썩은 감자 개수 : {this.state.badPotatoCnt}
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
          <div className="field_right_fields">
            <div className="field_right_bar">
              <input
                className="field_right_potato_checkbox"
                type="checkbox"
                onClick={this.handleAllChecked}
              />
              <button
                className="field_right_potato_add_btn"
                onClick={this.addPotatoHandler}
              >
                감자 추가
              </button>
              <button
                onClick={this.handleBadPotatoDelete}
                className="field_right_potato_remove_btn"
              >
                감자 삭제
              </button>
              <button
                onClick={this.deleteThisField}
                className="field_right_potato_field-delete_btn"
              >
                밭 삭제
              </button>
            </div>
            <div className="field_right_potato_contents">
              <div className="potato_component">
                {filteredPotatoes.map((el) => (
                  <div key={el.id} className="potato_component_body">
                    <input
                      type="checkbox"
                      className="PotatoChkBox"
                      value={el.id}
                      checked={el.isChecked}
                      onChange={this.handleCheckChildElement}
                    />
                    <div className="potato_component_body_left">
                      {el.status === "good" ? (
                        <img
                          className="potato_component_body_left_image"
                          src={potatoLogo}
                          alt=""
                        />
                      ) : (
                        <img
                          className="potato_component_body_left_image2"
                          src={badpotatoLogo}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="potato_component_body_right">
                      <div className="potato_component_body_right_potato-url">
                        <span className="potato_component_body_right_potato-url_text">
                          <a
                            href={el.potatoName}
                            target="_blank"
                            className="link"
                            value={el.id}
                            onClick={this.handlePotatoDateUpdate}
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
