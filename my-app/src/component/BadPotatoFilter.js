import React from "react";
import axios from "axios";
import potatoLogo from "../image/badpotato.png";
import { Redirect } from "react-router-dom";

// BadPotatoFilter 추가됨

class BadPotatoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badpotatoesArray: this.props.BadPotatoFilterObjArr,
    };
    this.handleBadPotatoDelete = this.handleBadPotatoDelete.bind(this);
  }

  handleAllChecked = (event) => {
    let badPotatoes = this.state.badpotatoesArray;
    badPotatoes.forEach(
      (badpotato) => (badpotato.isChecked = event.target.checked)
    );
    this.setState({ badpotatoesArray: badPotatoes });
  };

  handleCheckChildElement = (event) => {
    let badPotatoes = this.state.badpotatoesArray;
    console.log(event.target.defaultValue);
    badPotatoes.forEach((badpotato) => {
      if (badpotato.id === Number(event.target.defaultValue))
        badpotato.isChecked = true;
    });
    this.setState({ badpotatoesArray: badPotatoes });
  };

  handleBadPotatoDelete() {
    const delBadPotatoPromise = new Promise((resolve, reject) => {
      this.state.badpotatoesArray.forEach((badpotato) => {
        if (badpotato.isChecked) {
          axios({
            method: "delete",
            url: `https://hypotato.com/potato/${badpotato.id}`,
            withCredentials: true,
          });
        }
      });
    });

    delBadPotatoPromise.then(() => {
      axios
        .get("https://hypotato.com/userinfo", {
          withCredentials: true,
        })
        .then((userinfo) => {
          console.log(userinfo);
          this.props.history.push("/field", { ...userinfo.data.data });
        });
    });
  }

  render() {
    return (
      <div className="field_right_fields">
        <div className="field_right_bar">
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
              {this.props.BadPotatoFilterObjArr.map((el) => (
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
    );
  }
}

export default BadPotatoFilter;
