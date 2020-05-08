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
// temperary 
import AccountPage from "views/AccountPage/AccountPage";
=======
import Chatpanel from "./views/Chatpanel";
>>>>>>> 1ef228801b526ed9b0b641ddc2611e9b37e5ecee


var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={Components} />
      <Route path="/profile-page" component={AccountPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/posting-page" component={PostingPage} />
<<<<<<< HEAD

=======
      <Route path="/chat-page" component={Chatpanel} />
>>>>>>> 1ef228801b526ed9b0b641ddc2611e9b37e5ecee
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
