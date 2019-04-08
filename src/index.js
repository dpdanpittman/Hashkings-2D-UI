import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import LandingPage from "views/examples/LandingPage.jsx";
import RegisterPage from "views/examples/RegisterPage.jsx";
import ProfilePage from "views/examples/ProfilePage.jsx";
import Login from "./Login.jsx";
import Cookie from "js-cookie";

const username = Cookie.get("username");
console.log(username);
if(window.steem_keychain && !username) {
    // Steem Keychain extension installed...
	ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" render={props => <Index {...props} />} />
	  <Route path="/login" exact component={Login} />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
} else {
    // Steem Keychain extension not installed...
	ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" render={props => <Index {...props} />} />
	  <Route path="/login" exact component={Login} />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
}
