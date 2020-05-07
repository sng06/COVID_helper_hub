import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Input } from "@material-ui/core";
import axios from "axios";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function PostingPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  // set states of form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("/postings/" + props.match.params.id)
      .then((res) => {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setLocation(res.location);
        setPostTitle(res.postTitle);
        setDescription(res.description);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const handleClick = () => {
    const posting = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      location: location,
      postTitle: postTitle,
      description: description,
    };

    console.log(posting);

    axios
      .post("/postings/update/" + props.match.params.id, posting)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Website name"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <h3 className={classes.divider}>Edit your post</h3>
                  <CardBody>
                    <Input
                      id="first name"
                      type="text"
                      placeholder="First Name"
                      fullWidth
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      id="last name"
                      placeholder="Last Name"
                      fullWidth
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                      id="email"
                      type="text"
                      placeholder="Email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      id="location"
                      type="text"
                      placeholder="Location"
                      fullWidth
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <Input
                      id="title"
                      type="text"
                      placeholder="Post Title"
                      fullWidth
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <Input
                      id="description"
                      type="text"
                      placeholder="Description"
                      fullWidth
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to={"/landing-page"} className={classes.link}>
                      <Button color="info" size="lg" onClick={handleClick}>
                        Update
                      </Button>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
