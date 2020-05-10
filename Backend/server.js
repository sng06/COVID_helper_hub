const express = require("express");
const request = require("request");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const http = require('http').Server(app);
const io = require('socket.io')(http);

//routes
// volunteerSeeker routes
const VolunteerSeeker = require("./models/volunteerSeekerLogin.model");

app.use(cors());
app.use(express.json());
require("dotenv").config();

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

const GoogleOauth20Strategy = require("passport-google-oauth20");
const passport = require("passport");
const cookieSession = require("cookie-session");

// cookieSession config
app.use(
  cookieSession({
    maxAge: 7 * (24 * 60 * 60 * 1000), // One day in milliseconds
    keys: ["PLACEHOLDER"],
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

passport.use(
  new GoogleOauth20Strategy(
    {
      clientID:
        "1029963969782-4br4gl8kpq1mkcnkuvsgr9upuc2ot3e0.apps.googleusercontent.com",
      clientSecret: "_6tLXX_QysHFw2k2fWygdoKv",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      VolunteerSeeker.findOrCreate(
        { email: profile.emails[0].value },
        {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        },
        function (err, user) {
          // Updates user picture upon each auth session
          user.picture = profile._json.picture;
          user.save();
          // auth complete
          return done(err, user);
        }
      );
    }
  )
);
passport.use(GoogleOauth20Strategy);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

// passport.authenticate middleware is used here to authenticate the request
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Used to specify the required data; we only want read-only access to public information
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Successfully logged in");
    res.redirect("/");
  }
);

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../Frontend/", "build/")));

app.get("/landing-page", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

app.get("/login-page", (req, res) => {
  // send login page
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

app.get("/profile-page", (req, res) => {
  // send profile page
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

app.get("/posting-page", (req, res) => {
  // send posting page
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

app.get("/chat-page", (req, res) => {
  // send chat page
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

// Endpoint for this user's data
app.get("/userdata", isUserAuthenticated, (req, res) => {
  VolunteerSeeker.findOne({ email: req.user.email }, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.get("/volunteerSeeker/", (req, res) => {
  VolunteerSeeker.find()
    .then((volunteerSeekers) => res.json(volunteerSeekers))
    .catch((err) => res.status(400).json("Error: " + err));
});

// app.post("/volunteerSeeker/add", (req, res) => {
//   const username = req.body.username;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const password = req.body.password;
//   const email = req.body.email;

//   const newVolunteerSeeker = new VolunteerSeeker({
//     username,
//     firstName,
//     lastName,
//     password,
//     email,
//   });

//   newVolunteerSeeker
//     .save()
//     .then(() => res.json("New volunteer seeker added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//postings routes
const Posting = require("./models/postings.model");

app.get("/postings/", (req, res) => {
  Posting.find()
    .then((postings) => res.json(postings))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/postings/add", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const location = req.body.location;
  const postTitle = req.body.postTitle;
  const description = req.body.description;

  const newPosting = new Posting({
    firstName,
    lastName,
    email,
    location,
    postTitle,
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
      posting.firstName = req.body.firstName;
      posting.lastName = req.body.lastName;
      posting.email = req.body.email;
      posting.location = req.body.location;
      posting.postTitle = req.body.postTitle;
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

let history = [];

io.on('connection', function(socket){
    history.forEach((each) => {socket.emit('message', each)});
    function handleMessage({ user, message } = {}, callback) {
        let date = new Date();
        io.emit('message', {user: user, message: message, time: date.getTime()});
        history.push({user: user, message: message, time: date.getTime()});
        callback();
    }
    socket.on('message', handleMessage)
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);


