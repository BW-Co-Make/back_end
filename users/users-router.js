const router = require("express").Router();

const Users = require("./users-model.js");

const check = require('../middleware/index')

router.post('/',  check.validateUser, (req, res) => {
    Users.add(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({error: "Server could not post new user"})
    });
  });
  
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
 
  router.put('/:id', check.validateUserId, check.validateUser, (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({error: "Server could not update user", error: err})
    });
  });

  router.delete('/:id', check.validateUserId, (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
      res.status(200).json({message: 'The user was successfully deleted'})
    })
    .catch(err=>{
      res.status(500).json({message: "Server failed to remove the user", error: err})
    })
  });



  

module.exports = router;