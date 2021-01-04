import React, { Component } from "react";
import "./NotFoundPage.css"

class NotFoundPage extends Component {

  constructor(props) {
    super(props)
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    this.props.history.push("/");
  }

  render() {
    return (
    <div>
      <h1 className="notfound-h1">찾으시는 페이지가 없습니다.</h1>
      <h2 className="notfound-h2" onClick={this.goToHome}>홈으로</h2>
    </div>
    )
   

  }
}

export default NotFoundPage;
