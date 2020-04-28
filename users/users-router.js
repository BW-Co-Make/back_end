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

// get user's issues
router.get("/:id/issues", check.validateUserId, (req, res) => {
    // remove when (successfully) solved adding issues array to user
    const { id } = req.params;
    Users.getUserIssues(id)
    .then(userIssues => {
        const response = req.user;
        response.issues = userIssues;
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Server could not get the list of user\'s issues', error: err})
    })
    
});

// User end point to post an issue
router.post('/:id/issues', alfred, check.validateUserId, check.validateUser, (req, res) => {
    const { id } = req.params;
    const newIssue = req.body;
    newIssue.userId = id; // assign user id to body
    Users.findUserLocation(id).then(userLocation =>{
        let location = userLocation; // assign location foreign key
        newIssue.locationId = location; // add foreign key to issue body
        Users.addUserIssues(newIssue)
        .then(user => {
          res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({error: "Server could not add issue when assigning location", error: err})
          });
    })
    .catch(err => {
      res.status(500).json({error: "Server could not add issue due to location error", error: err})
    });
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