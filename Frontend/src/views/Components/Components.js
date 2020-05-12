// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";


import App from "./Sections/App.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUserAuthenticated, setisUserAuthenticated] = useState(false);

  const handleIsUserAuthenticated = (res) => {
    console.log("Checking value: " + res);
    setisUserAuthenticated(res);
  };

  useEffect(() => {
    axios
      .get("/userdata")
      .then((user) => {
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Website Name Test"
        rightLinks={<HeaderLinks onAuthorized={handleIsUserAuthenticated} />}
        fixed
        //href="/landing-page"
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg-dark-grey.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                {(firstName === "") | (firstName === undefined) ? (
                  <h1 className={classes.title}>
                    Login to see your name here.
                  </h1>
                ) : (
                  <h1 className={classes.title}>Welcome Back {firstName}.</h1>
                )}
                <h3 className={classes.subtitle}>
                  we need a name for this website
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        {/* <App /> */}
        <App isAuthenticated={isUserAuthenticated} user={firstName + " " + lastName} />
      </div>
      <Footer />
    </div>
  );
}
