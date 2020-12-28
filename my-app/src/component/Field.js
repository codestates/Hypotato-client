import React from "react";
import "./Field.css";
import Potato from "./Potato";
import potatoLogo from "../image/potato.png";
import FieldContents from "./FieldContents";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        nickname: "Kasimir",
        email: "scelerisque.lorem.ipsum@cursusnonegestas.com",
        fields: [
          {
            id: 45,
            fieldName: "China",
            fieldDesc: "dapibus id, blandit at,",
            category: "요리",
          },
          {
            id: 55,
            fieldName: "Korea, South",
            fieldDesc: "magnis dis parturient montes, nascetur ridiculus mus.",
            category: "기술",
          },
          {
            id: 65,
            fieldName: "Brazil",
            fieldDesc: "a, scelerisque",
            category: "운동",
          },
        ],
        potatoes: [
          {
            id: 873,
            potatoName: "www.google.com",
            potatoDesc: "Kirsten",
            status: "good",
          },
          {
            id: 883,
            potatoName: "www.amazon.com",
            potatoDesc: "Rana",
            status: "good",
          },
          {
            id: 893,
            potatoName: "www.naver.com",
            potatoDesc: "Tatum",
            status: "good",
          },
          {
            id: 903,
            potatoName: "www.facebook.com",
            potatoDesc: "Halla",
            status: "bad",
          },
          {
            id: 913,
            potatoName: "www.github.com",
            potatoDesc: "Orla",
            status: "good",
          },
        ],
      },
      isFieldClicked: false,
    };

    this.renderFieldContents = this.renderFieldContents.bind(this);
    this.potatoRenderHandler = this.potatoRenderHandler.bind(this);
    this.rennderPotatos = this.renderPotatos.bind(this);
  }

  potatoRenderHandler() {
    this.setState({
      isFieldClicked: true,
    });
  }

  // 밭들을 렌더하는 메소드
  renderFieldContents() {
    return (
      <div className="field_right_fields">
        <div className="field_right_bar">
          <button className="field_right_field_add_btn">밭 추가</button>
          <button className="field_right_field_remove_btn">밭 삭제</button>
        </div>

        <div className="field_right_field_contents">
          {this.state.data.fields.map((f) => (
            <FieldContents
              potatoRenderHandler={this.potatoRenderHandler}
              fieldName={f.fieldName}
              fieldDesc={f.fieldDesc}
              potatoCount={this.state.data.potatoes.length}
              category={f.category}
            />
          ))}
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
            <Potato />
            <Potato />
          </div>
        </div>
      </div>
    );
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

          {/* 밭을 보여주느냐, 감자를 보여주느냐 결정하는 부분 */}
          {!this.state.isFieldClicked
            ? this.renderFieldContents()
            : this.renderPotatos()}
        </div>
      </div>
    );
  }
}

export default Field;
