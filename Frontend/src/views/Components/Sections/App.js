import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Quote from "./Quote";
import UserInput from "./UserInput";
import DashBoard from "./DashBoard";


const useStyles = makeStyles(styles);



export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
      <div className={classes.title}>
          <h2>Dashboard placeholder</h2>
          <DashBoard />
          <br />
          <br />
        </div>
        <div className={classes.title}>
          <h2>Test Section</h2>
        </div>
        <div id="buttons">
          <div className={classes.title}>
            <h3>
              we can put the chatbot here? 
              <br />
              <br />
              <Quote />
            </h3>
          </div>

        </div>
        <div className={classes.space50} />
        <div id="inputs">
          <div className={classes.title}>
            <UserInput />
          </div>
        </div>
      </div>
    </div>
  );
}
