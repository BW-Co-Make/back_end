const router = require("express").Router();

const Users = require("./users-model.js");

const check = require('../middleware/index')


router.get("/", (req, res) => {
//   console.log('token', req.decodedToken)
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'Server could not get the list of users', error: err})
    })
});

router.get("/:id", check.validateUserId, (req, res) => {
    // console.log('token', req.decodedToken)
    res.status(200).json(req.user);
  });

  

module.exports = router;