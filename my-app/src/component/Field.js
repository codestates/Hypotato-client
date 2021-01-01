import React from "react";
import "./Field.css";
import Potato from "./Potato";
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
    this.fieldContentsRender = this.fieldContentsRender.bind(this);
    this.potatoClickHandler = this.potatoClickHandler.bind(this);
    this.renderPotatos = this.renderPotatos.bind(this);
    this.goToMyPage = this.goToMyPage.bind(this);
    this.goToInstruction = this.goToInstruction.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.modalOpenOrClose = this.modalOpenOrClose.bind(this);
    this.AddFieldModalOpen = this.AddFieldModalOpen.bind(this);
    this.addFiledValueUpdate = this.addFiledValueUpdate.bind(this);
    this.addFieldSubmit = this.addFieldSubmit.bind(this);
    this.countPotatoNumber = this.countPotatoNumber.bind(this);
  }

  countPotatoNumber() {
    const potatoes = this.props.location.state.potatoes;
    let good = 0;
    let bad = 0;
    potatoes.forEach( p => { 
      if(p.status === "good") {
        good++
      } else if(p.status === "bad") {
        bad++;
      }
    })
    this.setState({ goodPotato: good, badPotato: bad });
  }

  goToField() {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    })
    .then(
      (userInfo) => {
        this.setState({isFieldClicked: false});
        this.props.history.push("/field", {...userInfo.data.data}); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
      }
    )
  }

  goToMyPage() {
    console.log(1);
    this.props.history.push("/mypage");
  }

  goToInstruction() {
    this.props.history.push("/instruction");
  }

  potatoClickHandler(fieldId) { // 
    // 인자로 받은 fieldId를 가지고 해당 fieldId에 일치하는 감자 정보 받는 axios요청 전송.
    console.log(fieldId);
    axios({
      method: "get",
      url: `https://www.hypotato.com/field/${fieldId}`,
      withCredentials: true,
    })
    .then(
      res =>{ 
        console.log(res.data.data.potatoes)
        this.setState({
          potatoes: res.data.data.potatoes,
          isFieldClicked: true,
      });
     }
    )
  }

  signOutHandler() {
    this.props.history.push("/");
  }

  modalOpenOrClose() {
    this.state.isAddFieldClicked ? 
    this.setState({isAddFieldClicked: false}) 
    :
    this.setState({isAddFieldClicked: true});
  }

  addFiledValueUpdate(e) {
    const {name, value} = e.target;
    this.setState({
      [name] : value,
    })
  }

  addFieldSubmit() {
    const {fieldName, fieldDesc, fieldCategory} = this.state;
    if(!fieldName || !fieldDesc || !fieldCategory) {
      this.setState({alert: true})
    } else {
      console.log(fieldName, fieldDesc, fieldCategory);
    axios({
      method: "post",
      url: `https://www.hypotato.com/field/add`,
      withCredentials: true,
      data: { fieldName, fieldDesc, category: fieldCategory} // ES6문법에서 객체의 키값과 벨류값이 같은 경우, 키값 한번만 딱 적어줘도 fieldName: fieldName 이것과 같은 효과를 냄.
    })
    .then(() => {
      axios({
      method: "get",
      url: `https://www.hypotato.com/userinfo`,
      withCredentials: true,
      }).then((userinfo) => {
        this.modalOpenOrClose();
        this.props.history.push("/field", {...userinfo.data.data})
      })
    })
    .catch(err => console.log(err));
    }
  }

  // 모달 창 
  AddFieldModalOpen() {
    return (
      <div className="add-field-modal_bg">
        <div className="add-field-modal_contents">
          <div onClick={this.modalOpenOrClose} className="add-field-modal_close">+</div>
          <img className="add-field-modal_image" src={fieldImage} alt=""/>
          <span className="add-field-modal_title_field-name">밭 이름</span>
          <input className="add-field-modal_input" type="text" name="fieldName" placeholder="밭 이름" onChange={this.addFiledValueUpdate}/>
          <span className="add-field-modal_title_field-desc">밭 설명</span>
          <input className="add-field-modal_input" type="text" name="fieldDesc" placeholder="밭 설명" onChange={this.addFiledValueUpdate}/>
          <span className="add-field-modal_title_field-category">밭 카테고리</span>
          <select className="add-field-modal_input" name="fieldCategory" onChange={this.addFiledValueUpdate}>
          <option value="">카테고리 선택...</option>
            <option value="개발">개발</option>
            <option value="여행">여행</option>
            <option value="요리">요리</option>
          </select>
          {this.state.alert ? <h1 className="add-field_alert">밭 이름, 밭 설명. 밭 카테고리를 빠짐없이 입력해 주세요.</h1> : ""}
          <button onClick={this.addFieldSubmit} className="add-field-modal_submit-button">추가</button>
        </div>
      </div>
    )
  }

  // 밭들을 렌더하는 메소드
  fieldContentsRender() {
    const fields = this.props.location.state.fields;
    // console.log(fields);
    const potatoes = this.props.location.state.potatoes;
    return (
      <div className="field_right_fields">
        <div className="field_right_bar">
          <button onClick={this.modalOpenOrClose} className="field_right_field_add_btn">밭 추가</button>
          <button className="field_right_field_remove_btn">밭 삭제</button>
        </div>

        <div className="field_right_field_contents">
          {fields.map((f) => {
            let potatoCnt = 0;
            potatoes.forEach(potato => {
              
              if(f.id === potato.fieldId) {
                potatoCnt++;
              }
            })
            return (
            <FieldContents
              key={f.id}
              fieldId={f.id}
              potatoClickHandler={this.potatoClickHandler}
              fieldName={f.fieldName}
              fieldDesc={f.fieldDesc}
              potatoCount={potatoCnt} 
              category={f.category}
            />)
            })}
        </div>
      </div>
    );
  }

  // 감자들을 렌더하는 메소드.
  renderPotatos() {
    return (
      <div className="field_right_fields">
        <div className="field_right_bar">
          <button className="field_right_potato_add_btn">감자 추가</button>
          <button className="field_right_potato_remove_btn">감자 삭제</button>
          <button className="field_right_potato_show-all_btn">모든 감자</button>
          <button className="field_right_potato_show-bad_btn">썪은 감자</button>
        </div>

        <div className="field_right_potato_contents">
          <div className="potato_component">
            {this.state.potatoes.map( potato => {
              return <Potato potatoName={potato.potatoName} potatoDesc={potato.potatoDesc} status={potato.status}/>
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.countPotatoNumber()
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
            <div className="field_potato_count_good">정상 감자 개수 : {this.state.goodPotato}</div>
            <div className="field_potato_count_bad">썩은 감자 개수 : {this.state.badPotato}</div>
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

          {/* 밭을 보여주느냐, 감자를 보여주느냐 결정하는 부분 */}
          {!this.state.isFieldClicked
            ? this.fieldContentsRender()
            : this.renderPotatos()}
            
          {this.state.isAddFieldClicked ? this.AddFieldModalOpen() : ""}
        </div>
      </div>
    );
  }
}

export default Field;
