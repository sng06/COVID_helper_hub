import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import { Link } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Quote from "./Quote";
import UserInput from "./UserInput";
import DashBoard from "./DashBoard";
import TableauReport from "tableau-react";
import { Typography } from '@material-ui/core';

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
        <div>
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
        {/* <div id="inputs">
          <div className={classes.title}>
            <UserInput />
          </div>
        </div> */}
        <Button color="info" size="lg">
          post for help
        </Button>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem align="center">
            <Link to={"/posting-page"} className={classes.link}></Link>
          </GridItem>
        </GridContainer>
        <br/><br/><Typography variant="h4" align="center">The super nice viz made by Tableau</Typography><br/><br/>
        <TableauReport url="https://public.tableau.com/views/CoronavirusCovid-19DailyIndicators-OptimizedforDesktop/CoronavirusDailyIndicatorsDashboard?:embed=y&:display_count=y&:origin=viz_share_link" />
        <br/><br/><Typography variant="h4" align="center">LOL my sad viz... at least it works :)</Typography><br/><br/>
        <TableauReport url="https://public.tableau.com/views/COVID-19Data2/Sheet1?:display_count=y&publish=yes&:origin=viz_share_link" />
      </div>
    </div>
  );
}
