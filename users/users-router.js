const router = require("express").Router();

const Users = require("./users-model.js");

const check = require('../middleware/index')

const alfred = require('../auth/authenticator')
// if authenticator is a problem for FE can take it out until tables are healthy. Named Alfred cuz he guards the bat cave

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
 
  router.put('/:id', alfred, check.validateUserId, check.validateUser, (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({error: "Server could not update user", error: err})
    });
  });

  router.delete('/:id', alfred, check.validateUserId, (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
      res.status(200).json({message: 'The user was successfully deleted'})
    })
    .catch(err=>{
      res.status(500).json({message: "Server failed to remove the user", error: err})
    })
  });



  

module.exports = router;