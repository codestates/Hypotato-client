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

import axios from "axios";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <Signin {...routeProps} />}
          />
          <Route
            exact
            path="/signup"
            render={(routeProps) => <Signup {...routeProps} />}
          />
          <Route
            exact
            path="/mypage"
            render={(routeProps) => <Mypage {...routeProps} />}
          />
          <Route
            exact
            path="/instruction"
            render={(routeProps) => <Instruction {...routeProps} />}
          />
          <Route
            exact
            path="/field"
            render={(routeProps) => <Field {...routeProps} />}
          />
          <Route
            exact
            path="/mypage"
            render={(routeProps) => <Mypage {...routeProps} />}
          />
          <Route
            exact
            path="/instruction"
            render={(routeProps) => <Instruction {...routeProps} />}
          />
          <Route
            exact
            path="/editinfo"
            render={(routeProps) => <EditInfo {...routeProps} />}
          />
          <Route
            exact
            path="/addpotato"
            render={(routeProps) => <AddPotato {...routeProps} />}
          />
          <Route
            exact
            path="/potato"
            render={(routeProps) => <Potato {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
