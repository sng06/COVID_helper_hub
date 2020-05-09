import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import TableauReport from "tableau-react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function App(props) {
  const classes = useStyles();
  //const [isUserAuthenticated, setisUserAuthenticated] = useState(false);

  const handleClick = () => {
    window.location.replace("/auth/google");
  };

  return (
    <div className={classes.sections}>
      <div className={classes.container}>

      
        <div className={classes.space50} />

         <GridContainer className={classes.textCenter} justify="center">
          <GridItem align="center">
            {/* <Link to={"/posting-page"} className={classes.link}>
              <Button color="info" size="lg">
                Sign up to post
              </Button>
            </Link> */}
            {props.isAuthenticated ? (
              <Button color="info" size="lg" href="/posting-page">
                Start post here
              </Button>
            ) : (
              <Tooltip
                id="instagram-tooltip"
                title="Sign up with Google"
                placement={window.innerWidth > 959 ? "top" : "left"}
                //placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="info" size="lg" onClick={handleClick}>
                  Sign up to post
                </Button>
              </Tooltip>
              // ) : (
              //   <Button color="info" size="lg" href="/posting-page">
              //     Start post here
              //   </Button>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem align="center">
            <Link to={"/posting-page"} className={classes.link}></Link>
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <Typography variant="h4" align="center">
          The super nice viz made by Tableau
        </Typography>
        <br />
        <br />
        <TableauReport url="https://public.tableau.com/views/CoronavirusCovid-19DailyIndicators-OptimizedforDesktop/CoronavirusDailyIndicatorsDashboard?:embed=y&:display_count=y&:origin=viz_share_link" />
        <br />
        <br />
        <Typography variant="h4" align="center">
          LOL my sad viz... at least it works :)
        </Typography>
        <br />
        <br />
        <TableauReport url="https://public.tableau.com/views/COVID-19Data2/Sheet1?:display_count=y&publish=yes&:origin=viz_share_link" />
      </div>
    </div>
  );
}
