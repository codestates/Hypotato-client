import React from "react";
import axios from "axios";
import potatoLogo from "../image/tresh.png";
import "./BadPotatoFilter.css";

class BadPotatoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badPotatoes: "",
      potatoes: "",
      goodPotato: 0,
      badPotato: 0,
    };

    this.handleBadPotatoDelete = this.handleBadPotatoDelete.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.countPotatoNumber = this.countPotatoNumber.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.goToField = this.goToField.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.handlePotatoDateUpdate = this.handlePotatoDateUpdate.bind(this);
  }

  componentDidMount() {
    this.countPotatoNumber();
    this.setState({ badPotatoes: this.props.location.state.badPotatoes });
  }

  componentDidUpdate() {
    
  }

  countPotatoNumber() {

    const potatoes = this.props.location.state.potatoes;
    let good = 0;
    let bad = 0;
    potatoes.forEach((p) => {
      if (p.status === "good") {
        good++;
      } else if (p.status === "bad") {
        bad++;
      }
    });
    this.setState({ goodPotato: good, badPotato: bad });
  }

  signOutHandler() {
    axios({
      method: "post",
      url: `https://www.hypotato.com/signout`,
      withCredentials: true,
    })
    .then(() => {
      this.props.history.push("/");
      this.props.classNameChanger(); // 로그아웃하면 다시 배경화면을 움직이도록 바꾸게 하는 메소드; App.js로부터 넘어옴
    })
  }


  goToInstruction() {
       // 사용설명서로 갈 때는 axios요청이 불필요한데, 감자 개수를 카운트 하기 위해, state에 있는 값을 보냄. 
       const potatoes = this.props.location.state.potatoes;
       const {goodPotato, badPotato } = this.state;
       this.props.history.push("/instruction", { goodPotato, badPotato, potatoes });
  }

  goToField() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
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
      this.props.history.push("/mypage", { ...userInfo.data.data }); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
    });
  }

  handleAllChecked(event) {
    let badPotatoes = this.props.location.state.badPotatoes;
    badPotatoes.forEach(
      (badpotato) => (badpotato.isChecked = event.target.checked)
    );
    this.setState({ badPotatoes: badPotatoes });
  }

  handleCheckChildElement(event) {
    let badPotatoes = this.props.location.state.badPotatoes;
    badPotatoes.forEach((badpotato) => {
      if (badpotato.id === Number(event.target.defaultValue))
        badpotato.isChecked = event.target.checked;
    });
    this.setState({ badPotatoes: badPotatoes });
  }

  async handleBadPotatoDelete() {
    for (let el of this.state.badPotatoes) {
      if (el.isChecked) {
        await axios({
          method: "delete",
          url: `https://www.hypotato.com/potato/${el.id}`,
          withCredentials: true,
        });
      }
    }

    let badPotatoes = [];
    axios
      .get("https://www.hypotato.com/userinfo", {
        withCredentials: true,
      })
      .then((userinfo) => {
        const potatoes = userinfo.data.data.potatoes;
        potatoes.forEach((potato) => {
          if (potato.status === "bad") {
            potato.isChecked = false; // 그냥 isChecked 키와 false 벨류를 부여하기 위한 로직.
            badPotatoes.push(potato);
          }
        });

        this.props.history.push("/badpotato", {
          badPotatoes: badPotatoes,
          potatoes: userinfo.data.data.potatoes,
        });

        this.countPotatoNumber();
      });
  }

  // 감자 상태 변경 (날짜와 상태 업데이트)
  handlePotatoDateUpdate(event) {
    const { value } = event.target.attributes[3];

    console.log("감자 선택 = ",value);

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
        let badPotatoes = [];
        axios
        .get("https://www.hypotato.com/userinfo", {
          withCredentials: true,
        })
        .then((userinfo) => {
          
          const potatoes = userinfo.data.data.potatoes;
          potatoes.forEach((potato) => {
            if (potato.status === "bad") {
              potato.isChecked = false; // 그냥 isChecked 키와 false 벨류를 부여하기 위한 로직.
              badPotatoes.push(potato);
            }
          });
  
          this.props.history.push("/badpotato", {
            badPotatoes: badPotatoes,
            potatoes: userinfo.data.data.potatoes,
          });
  
          this.countPotatoNumber();
        });
      });
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

            {/* 봄결님 & 인수 추가코드 : onClick = {this.BadPotatoFilter} */}
            <div
              className="field_potato_count_bad"
              onClick={this.BadPotatoFilter}
            >
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
          <div className="field_right_fields">
            <div className="field_right_bar" >
              <input
                type="checkbox"
                className="badPotatoAllChkBox"
                onClick={this.handleAllChecked}
              />
              <button
                className="field_right_field_remove_btn"
                onClick={this.handleBadPotatoDelete}
              >
                감자 삭제
              </button>
            </div>
            <div className="field_right_field_contents">
              <div className="field_right_potato_contents">
                <div className="potato_component">
                  {this.props.location.state.badPotatoes.map((el) => (
                    <div key={el.id} className="potato_component_body">
                      <input
                        type="checkbox"
                        className="badPotatoChkBox"
                        value={el.id}
                        checked={el.isChecked}
                        onChange={this.handleCheckChildElement}
                      />
                      <div className="potato_component_body_left">
                        <img
                          className="potato_component_body_left_image3"
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
      </div>
    );
  }
}

export default BadPotatoFilter;
