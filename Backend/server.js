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

const { Schema } = mongoose;
const VolunteerSeekerLoginSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
});
const VolunteerSeeker = mongoose.model(
  "volunteer_seekers",
  VolunteerSeekerLoginSchema
);

const PostingsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  postalCode: String,
  phoneNumber: String,
  gender: String,
  description: String,
});
const Postings = mongoose.model("postings", PostingsSchema);

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
