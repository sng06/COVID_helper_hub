// const router = require('express').Router();
// const Posting = require('../models/postings.model')

// router.route('/').get((req, res) => {
//   Postings.find()
//     .then(postings => res.json(postings))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const postalCode = req.body.postalCode;
//     const phoneNumber = req.body.phoneNumber;
//     const gender = req.body.gender;
//     const description = req.body.description;

//     const newPosting = new Posting({
//         username,
//         firstname,
//         lastname,
//         email,
//         postalCode,
//         phoneNumber,
//         gender,
//         description
//     });

//     newPosting.save()
//     .then(() => res.json('New posting is added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
