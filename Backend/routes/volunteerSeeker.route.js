// const router = require("express").Router();
// const VolunteerSeeker = require("../models/volunteerSeekerLogin.model");

// router.route("/").get((req, res) => {
//   VolunteerSeeker.find()
//     .then((volunteerSeekers) => res.json(volunteerSeekers))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//   const username = req.body.username;
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const password = req.body.password;
//   const email = req.body.email;

//   const newVolunteerSeeker = new VolunteerSeeker({
//     username,
//     firstname,
//     lastname,
//     password,
//     email,
//   });

//   newVolunteerSeeker
//     .save()
//     .then(() => res.json("New volunteer seeker added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// module.exports = router;
