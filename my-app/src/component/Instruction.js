import React from "react";
import potatoLogo from "../image/potato.png";
import "./Instruction.css";
import axios from "axios";
import Typing from "react-typing-animation";

const Instruction = ({ history, location }) => {
  const potatoes = location.state.potatoes;
  console.log(location);
  const goodPotato = location.state.goodPotato;
  const badPotato = location.state.badPotato;
  
  const goToMyPage = () => {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      // 👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾this.setState({ isFieldClicked: false });
      history.push("/mypage", { ...userInfo.data.data });
    });
  };

  const goToInstruction = () => {
    const potatoes = location.state.potatoes;
    const { goodPotato, badPotato } = location.state;
    history.push("/instruction", { goodPotato, badPotato, potatoes });
  };

  const goToField = () => {
    axios({
      method: "get",
      url: ` https://www.hypotato.com/userinfo`,
      withCredentials: true,
    }).then((userInfo) => {
      history.push("/field", { ...userInfo.data.data }); // 어디서든지 감자 프로필 이미지를 누르면 밭으로 가는데, 그 때 다시 밭 정보를 서버로부터 받아서 history push될 때 같이 보내주기 위한 로직.
    });
  };

  const badPotatoFilter = () => {
    let badpotatoes = [];
    potatoes.forEach((badPotato) => {
      if (badPotato.status === "bad") {
        badPotato.isChecked = false;
        badpotatoes.push(badPotato);
      }
    });
    let badPotatoCount = badpotatoes.length;
    let goodPotatoCount = potatoes.length - badpotatoes.length;
    history.push("/badpotato", {
      badPotatoes: badpotatoes,
      potatoes: potatoes,
      badPotatoCount: badPotatoCount,
      goodPotatoCount: goodPotatoCount,
    });
  }

  const signOutHandler = () => {
    axios({
      method: "post",
      url: `https://www.hypotato.com/signout`,
      withCredentials: true,
    }).then(() => {
      history.push("/");
      this.props.classNameChanger(); // 로그아웃하면 다시 배경화면을 움직이도록 바꾸게 하는 메소드; App.js로부터 넘어옴
    });
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
          <div className="field_potato_count_good">정상 감자 개수 : {goodPotato}</div>
          <div onClick ={badPotatoFilter} className="field_potato_count_bad">썩은 감자 개수 : {badPotato}</div>
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
