import React from "react";
import potatoLogo from "../image/potato.png";
import "./Instruction.css";
import Typing from "react-typing-animation";

const Instruction = ({ history }) => {
  const goToMyPage = () => {
    history.push("/mypage");
  };

  const goToInstruction = () => {
    history.push("/instruction");
  };

  const goToField = () => {
    history.push("/field");
  };

  const signOutHandler = () => {
    history.push("/");
  };

  return (
    <div className="field_entire">
      <div className="field_left">
        <div className="field_profile">
          <img
            className="field_profile_photo"
            src={potatoLogo}
            alt="이미지를 찾을 수 없습니다."
            onClick={goToField}
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
          <div className="field_right_menu_mypage" onClick={goToMyPage}>
            마이페이지
          </div>
          <div className="field_right_menu_manual" onClick={goToInstruction}>
            사용 설명서
          </div>
          <div className="field_right_menu_logout" onClick={signOutHandler}>
            로그아웃
          </div>
        </div>
        <div className="field_right_fields, inst_main">
          <div className="inst_modal">
            <div className="inst_title">How To Use Potato</div>
            <div className="inst_value">
              <Typing>
                <p>" hypotato hype link + potato "</p>
                <p>즐겨찾기 농장 hypotato에 오신 여러분 환영합니다.</p>
                <p>이곳에서는 여러분의 즐겨찾기를 관리 할 수 있으며</p>
                <p>즐겨찾기는 “감자" 즐겨찾기 폴더는 “밭" 으로 표현됩니다.</p>
                <p>글쓴이 : 정인수의 검</p>
              </Typing>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
