const express = require("express");
const request = require("request");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/", (req, res) => res.send("Hello World!"));

// MongoDB configuration
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//routes
// volunteerSeeker routes
const VolunteerSeeker = require("./models/volunteerSeekerLogin.model");

app.get("/volunteerSeeker/", (req, res) => {
  VolunteerSeeker.find()
    .then((volunteerSeekers) => res.json(volunteerSeekers))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/volunteerSeeker/add", (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const email = req.body.email;

  const newVolunteerSeeker = new VolunteerSeeker({
    username,
    firstName,
    lastName,
    password,
    email,
  });

  newVolunteerSeeker
    .save()
    .then(() => res.json("New volunteer seeker added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//postings routes
const Posting = require("./models/postings.model");

app.get("/postings/", (req, res) => {
  Posting.find()
    .then((postings) => res.json(postings))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/postings/add", (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const postalCode = req.body.postalCode;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const description = req.body.description;

  const newPosting = new Posting({
    username,
    firstName,
    lastName,
    email,
    postalCode,
    phoneNumber,
    gender,
    description,
  });

  newPosting
    .save()
    .then(() => res.json("New posting is added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/postings/:id", (req, res) => {
  Posting.findById(req.params.id)
    .then((posting) => res.json(posting))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/postings/:id", (req, res) => {
  Posting.findByIdAndDelete(req.params.id)
    .then(() => res.json("Posting is deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/postings/update/:id", (req, res) => {
  Posting.findById(req.params.id)
    .then((posting) => {
      posting.username = req.body.username;
      posting.firstName = req.body.firstName;
      posting.lastName = req.body.lastName;
      posting.email = req.body.email;
      posting.postalCode = req.body.postalCode;
      posting.phoneNumber = req.body.phoneNumber;
      posting.gender = req.body.gender;
      posting.description = req.body.description;

      posting
        .save()
        .then(() => res.json("Posting is updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/getRandomQuote", (req, res) => {
  request("https://quote-garden.herokuapp.com/api/v2/quotes/random", function (
    error,
    response,
    body
  ) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (!error && response.statusCode == 200) {
      // console.log(body)
      var parsedBody = JSON.parse(body);
      var quote = parsedBody["quote"]["quoteText"];
      res.send({ quote });
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
