const router = require("express").Router();

const Issues = require("./issues-model");
const Users = require("../users/users-model");

const check = require('../middleware/index');

const alfred = require('../auth/authenticator');

router.get("/", (req, res) => {
    //   console.log('token', req.decodedToken)
      Issues.find()
        .then(issues => {
          res.status(200).json(issues);
        })
        .catch(err => {
            res.status(500).json({error: 'Server could not get the list of issues', error: err})
        })
    });
    
    router.get("/:id", check.validateIssueId, (req, res) => {
        
        res.status(200).json(req.issue);
    });
    
    router.post('/', alfred, (req, res) => {
        let id = req.decodedToken.userId
        const newIssue = req.body;
        newIssue.userId = id; // assign user id to body
        console.log(newIssue)
        Users.findUserLocation(id).then(userLocation =>{
            console.log(userLocation);
            let location = userLocation[0]; // assign location foreign key
            newIssue.zip_code = location.zip_code
            newIssue.locationId = location.locationId; // add foreign key to issue body
            Users.addUserIssues(newIssue)
            .then(user => {
              res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({error: "Server could not add issue when assigning location", error: err})
              });
        })
        .catch(err => {
          res.status(500).json({message: "Server could not add issue due to location error", error: err})
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