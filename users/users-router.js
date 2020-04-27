const router = require("express").Router();

const Users = require("./users-model.js");


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

router.get("/:id", (req, res) => {
    const { id } = req.params;
    // console.log('token', req.decodedToken)
    Users.findById(id)
      .then(user => {
        if(user){
            res.status(200).json(user)
        }
        else {
            res.status(404).json({message: `User with id: ${id} was not found`})
        }
      })
      .catch(err => {
        res.status(500).json({error: 'Server could not get the user', error: err})
    })
  });


module.exports = router;