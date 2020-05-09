import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PostingPage from "views/PostingPage/PostingPage";
<<<<<<< HEAD
import edit_PostingPage from "views/PostingPage/edit_PostingPage";
// temperary 
=======
// temperary
>>>>>>> a0d6e302324510ba3e8420e274256b26c94a89c3
import AccountPage from "views/AccountPage/AccountPage";
import Chatpanel from "./views/Chatpanel";

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

      <Route path="/chat-page" component={Chatpanel} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
