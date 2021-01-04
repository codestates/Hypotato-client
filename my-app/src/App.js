import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Field from "./component/Field";
import Mypage from "./component/Mypage";
import Instruction from "./component/Instruction";
import EditInfo from "./component/EditInfo";
import AddPotato from "./component/AddPotato";
import Potato from "./component/Potato";
import Badpotato from "./component/BadPotatoFilter";
import NotFoundPage from "./component/NotFoundPage";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classNameForAnimation: "body-for-animation",
      backgroundChangeCount: 0,
    };

    this.classNameChanger = this.classNameChanger.bind(this);
  }


  
  classNameChanger() {
    if(this.state.classNameForAnimation === "body") {
      this.setState({classNameForAnimation: "body-for-animation"})
    } else {
      this.setState({classNameForAnimation: "body"})
    }
  }

  render() {
    return (
      <div className={this.state.classNameForAnimation} >
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <Signin {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/signup"
            render={(routeProps) => <Signup {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/mypage"
            render={(routeProps) => <Mypage {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/instruction"
            render={(routeProps) => <Instruction {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/field"
            render={(routeProps) => <Field {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/mypage"
            render={(routeProps) => <Mypage {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/instruction"
            render={(routeProps) => <Instruction {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/editinfo"
            render={(routeProps) => <EditInfo {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/addpotato"
            render={(routeProps) => <AddPotato {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/potato"
            render={(routeProps) => <Potato {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            exact
            path="/badpotato"
            render={(routeProps) => <Badpotato {...routeProps} classNameChanger={this.classNameChanger} />}
          />
          <Route
            render={(routeProps) => <NotFoundPage {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
