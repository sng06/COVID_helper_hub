import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PostingPage from "views/PostingPage/PostingPage";
import edit_PostingPage from "views/PostingPage/edit_PostingPage";
import AccountPage from "views/AccountPage/AccountPage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={Components} />
      <Route path="/profile-page" component={AccountPage} />
      {/* need to change this to account page */}
      <Route path="/login-page" component={LoginPage} />
      {/* we dont need login page   */}
      <Route path="/posting-page" component={PostingPage} />
      <Route path="/edit-posting-page" component={edit_PostingPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
