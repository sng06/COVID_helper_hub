/*eslint-disable*/
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [isUserAuthenticated, setisUserAuthenticated] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/userdata")
      .then((res) => {
        res.data.email !== undefined && res.data.email !== ""
          ? (setisUserAuthenticated(true),
            console.log("USER LOG IN!!!!!!!!!!!!!"),
            props.onAuthorized(true))
          : (setisUserAuthenticated(false), props.onAuthorized(false)); //want to update the isUserAuthenticated state here back to Components
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    window.location.replace("/auth/google");
  };

  const logout = () => {
    window.location.replace("/logout");
  };

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            // <a
            //   href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
            //   target="_blank"
            //   className={classes.dropdownLink}
            // >
            //   Documentation
            // </a>
          ]}
        />
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="instagram-twitter"
          title="do we want any of this?"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href=""
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        {isUserAuthenticated ? (
          <Button
            color="transparent"
            href="/profile-page"
            target="_blank"
            size="large"
            className={classes.navLink}
          >
            My Account (props.)
          </Button>
        ) : (
          //</ListItem></Link>
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}
          ></Button>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {isUserAuthenticated ? (
          <Button
            color="transparent"
            href=""
            target="_blank"
            size="large"
            className={classes.navLink}
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <Tooltip
            id="instagram-tooltip"
            title="Login with Google"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href=""
              target="_blank"
              size="large"
              className={classes.navLink}
              onClick={handleClick}
            >
              Volunteer Seeker Login
            </Button>
          </Tooltip>
        )}
      </ListItem>
    </List>
  );
}
