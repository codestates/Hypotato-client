import React from "react";
import { Redirect } from "react-router-dom";
import "./Field.css";
import potatoLogo from "../image/potato.png";
import FieldContents from "./FieldContents";
import fieldImage from "../image/potato-field.jpg";
import axios from "axios";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      fieldName: "",
      fieldDesc: "",
      fieldCategory: "",
      isFieldClicked: false,
      isAddFieldClicked: false,
      potatoes: "",
      goodPotato: 0,
      badPotato: 0,
    };

    this.goToField = this.goToField.bind(this);
    this.fieldClickHandler = this.fieldClickHandler.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.AddFieldModalOpen = this.AddFieldModalOpen.bind(this);
    this.modalOpenOrClose = this.modalOpenOrClose.bind(this);
    this.addFieldSubmit = this.addFieldSubmit.bind(this);
    this.addFiledValueUpdate = this.addFiledValueUpdate.bind(this);
    this.countPotatoNumber = this.countPotatoNumber.bind(this);
    this.goToBadPotatoes = this.goToBadPotatoes.bind(this);
    this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
  }

  componentDidMount() {
    this.countPotatoNumber();
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

  goToField() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      this.setState({ isFieldClicked: false });
      this.props.history.push("/field", { ...userInfo.data.data });
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
    const potatoes = this.props.location.state.potatoes;
     // 사용설명서로 갈 때는 axios요청이 불필요한데, 감자 개수를 카운트 하기 위해, state에 있는 값을 보냄. 
    const {goodPotato, badPotato } = this.state;
    this.props.history.push("/instruction", { goodPotato, badPotato, potatoes});
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
  //------------------------- 화면 이동을 위한 메소드 여기까지 --------------------------------------

  // ------------------------ 밭 추가 버튼 누르면 열리는 모달관련 메소드들 ----------------------**
  modalOpenOrClose() {
    this.state.isAddFieldClicked
      ? this.setState({ isAddFieldClicked: false })
      : this.setState({ isAddFieldClicked: true });
  }

  AddFieldModalOpen() {
    return (
      <div className="add-field-modal_bg">
        <div className="add-field-modal_contents">
          <div
            onClick={this.modalOpenOrClose}
            className="add-field-modal_close"
          >
            +
          </div>
          <img className="add-field-modal_image" src={fieldImage} alt="" />
          <span className="add-field-modal_title_field-name">밭 이름</span>
          <input
            className="add-field-modal_input"
            type="text"
            name="fieldName"
            placeholder="밭 이름"
            onChange={this.addFiledValueUpdate}
          />
          <span className="add-field-modal_title_field-desc">밭 설명</span>
          <input
            className="add-field-modal_input"
            type="text"
            name="fieldDesc"
            placeholder="밭 설명"
            onChange={this.addFiledValueUpdate}
          />
          <span className="add-field-modal_title_field-category">
            밭 카테고리
          </span>
          <select
            className="add-field-modal_input"
            name="fieldCategory"
            onChange={this.addFiledValueUpdate}
          >
            <option value="">카테고리 선택...</option>
            <option value="개발">개발</option>
            <option value="여행">여행</option>
            <option value="요리">요리</option>
          </select>
          {this.state.alert ? (
            <h1 className="add-field_alert">
              밭 이름, 밭 설명. 밭 카테고리를 빠짐없이 입력해 주세요.
            </h1>
          ) : (
            ""
          )}
          <button
            onClick={this.addFieldSubmit}
            className="add-field-modal_submit-button"
          >
            추가
          </button>
        </div>
      </div>
    );
  }

  // 모달에서 글자를 입력할 때 this.state에 값을 할당해 주는 함수
  addFiledValueUpdate(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // 밭 추가 모달에서 [추가]버튼을 눌렀을 때 메소드
  addFieldSubmit() {
    const { fieldName, fieldDesc, fieldCategory } = this.state;
    if (!fieldName || !fieldDesc || !fieldCategory) {
      this.setState({ alert: true });
    } else {
      axios({
        method: "post",
        url: `https://www.hypotato.com/field/add`,
        withCredentials: true,
        data: { fieldName, fieldDesc, category: fieldCategory }, // ES6문법에서 객체의 키값과 벨류값이 같은 경우, 키값 한번만 딱 적어줘도 fieldName: fieldName 이것과 같은 효과를 냄.
      })
        .then(() => {
          axios({
            method: "get",
            url: `https://www.hypotato.com/userinfo`,
            withCredentials: true,
          }).then((userinfo) => {
            this.modalOpenOrClose();
            this.props.history.push("/field", { ...userinfo.data.data });
          });
        })
        .catch((err) => console.log(err));
    }
  }
  // ------------------------------ 밭 추가 버튼을 눌렀을 때 열리는 모달 관련 메소드들 여기까지 ------------------------------

  // 밭을 클릭하면 감자들을 볼 수 있는 메소드
  fieldClickHandler(fieldId) {
      // 감자 페이지에서 사용설명서로 갈 때 보내줄 전체 정상감자, 썪은 감자 개수를 보내주기 위해 할당함. 
    const {goodPotato, badPotato} = this.state;
    axios({
      method: "get",
      url: `https://www.hypotato.com/field/${fieldId}`,
      withCredentials: true,
    }).then((res) => {
      this.props.history.push("/potato", {
        ...res.data.data,
        fieldId: fieldId,
        goodPotato, badPotato, 
        potatoes: this.props.location.state.potatoes,
      });
    });
  }

  // 로그아웃
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

  // 밭 카테고리 필터링
  handleCategoryFilter(event) {
    axios
      .get("https://www.hypotato.com/userinfo", {
        withCredentials: true,
      })
      .then((userinfo) => {
        const userFields = userinfo.data.data.fields;
        const userPotatoes = userinfo.data.data.potataoes;

        let fieldsFilter = [];

        if (event.target.textContent === "전체") {
          fieldsFilter = userFields;
        } else {
          userFields.forEach((field) => {
            if (field.category === event.target.textContent) {
              fieldsFilter.push(field);
            }
          });
        }
        this.props.history.push("/field", {
          ...userinfo.data.data,
          categorizedFields: fieldsFilter,
        });
      });
  }

  render() {
    const { categorizedFields, fields } = this.props.location.state;
    const mainFields = categorizedFields ? categorizedFields : fields;
    const potatoes = this.props.location.state.potatoes;
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
              onClick={this.goToBadPotatoes}
            >
              썩은 감자 개수 : {this.state.badPotato}
            </div>
          </div>
          <div className="field_categories">
            <div className="field_categories_title">카테고리</div>
            <div className=" field_categories_table">
              <div
                className="field_categories_all"
                value="전체"
                onClick={this.handleCategoryFilter}
              >
                전체
              </div>
              <div
                className="field_categories_dev"
                value="개발"
                onClick={this.handleCategoryFilter}
              >
                개발
              </div>
              <div
                className="field_categories_travel"
                value="여행"
                onClick={this.handleCategoryFilter}
              >
                여행
              </div>
              <div
                className="field_categories_cook"
                value="요리"
                onClick={this.handleCategoryFilter}
              >
                요리
              </div>
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
              <button
                onClick={this.modalOpenOrClose}
                className="field_right_field_add_btn"
              >
                밭 추가
              </button>
            </div>

            <div className="field_right_field_contents">
              {mainFields.map((f) => {
                let goodPotatoCnt = 0;
                let badPotatoCnt = 0;
                potatoes.forEach((potato) => {
                  if (f.id === potato.fieldId) {
                    if (potato.status === "good") {
                      goodPotatoCnt++;
                    } else {
                      badPotatoCnt++;
                    }
                  }
                });
                return (
                  <FieldContents
                    key={f.id}
                    fieldId={f.id}
                    fieldClickHandler={this.fieldClickHandler}
                    fieldName={f.fieldName}
                    fieldDesc={f.fieldDesc}
                    goodPotatoCount={goodPotatoCnt}
                    badPotatoCount={badPotatoCnt}
                    category={f.category}
                  />
                );
              })}
            </div>
          </div>
          {this.state.isAddFieldClicked ? this.AddFieldModalOpen() : ""}
        </div>
      </div>
    );
  }
}

export default Field;
