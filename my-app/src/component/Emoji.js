import React, { Component } from "react";

class Emoji extends Component {
  render() {
    return <span className="emoji">{this.props.emoji}</span>;
  }
}

export default Emoji;
