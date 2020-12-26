import React from "react";
import "./Field.css";
import potatoLogo from "../image/potato.png";
import FieldContents from "./FieldContents";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields : [
        {id:1, fieldName: "리액트관련", fieldDesc: "리액트관련 영상들을 모아둔 자료입니다.", potatoCount: 10, fieldCategory: "개발"},
        {id:2, fieldName: "요리관련", fieldDesc: "요리관련 자료들.", potatoCount: 3, fieldCategory: "요리"},
        {id:3, fieldName: "자바스크립트", fieldDesc: "자바스크립트 핵심모음집자료 모음", potatoCount: 20, fieldCategory: "개발"},
        {id:4, fieldName: "서버", fieldDesc: "My SQL, Express관련자료 모음", potatoCount: 7, fieldCategory: "개발"},
        {id:4, fieldName: "서버", fieldDesc: "My SQL, Express관련자료 모음", potatoCount: 7, fieldCategory: "개발"},
        {id:4, fieldName: "서버", fieldDesc: "My SQL, Express관련자료 모음", potatoCount: 7, fieldCategory: "개발"},
        {id:4, fieldName: "서버", fieldDesc: "My SQL, Express관련자료 모음", potatoCount: 7, fieldCategory: "개발"},
        {id:4, fieldName: "서버", fieldDesc: "My SQL, Express관련자료 모음", potatoCount: 7, fieldCategory: "개발"}
      ],
      isMypageClicked: false,
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
          />
          </div>
          <div className="field_potato_count">
            <div className="field_potato_count_good">정상 감자 개수: 0</div>
            <div className="field_potato_count_bad">썪은 감자 개수: 0</div>
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
             <div className="field_right_menu_mypage">마이페이지</div>
             <div className="field_right_menu_manual">사용 설명서</div>
             <div className="field_right_menu_logout">로그아웃</div>
          </div>
          <div className="field_right_fields">
            <div className="field_right_contents">
              {this.state.fields.map( f => 
                <FieldContents fieldName={f.fieldName} fieldDesc={f.fieldDesc} potatoCount={f.potatoCount} category={f.fieldCategory} />
              )}
            </div>
             
          </div>
        </div>
      </div>
    );
  }
}
export default Field;
