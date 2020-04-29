const Users = require('../users/users-model')
const Issues = require('../issues/issues-model')
const Locations = require('../locations/locations-model')

module.exports = {
    validateUser,
    validateUserId,
    validateIssueId,
    validateIssue,
    handleUsersLocations
}

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.findById(id)
    .then(user => {
      if(user){
        req.user = user;
        next();
      } else {
        res.status(404).json({message: `User with the id of ${id} was not found`})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not get user'})
    });
}

// use this for post body validation
function validateUser(req, res, next) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: "missing user data" })
   } else {
    if (!req.body.username) {
     return res.status(400).json({ message: "missing required field" })
   } else if(!req.body.first_name){
    return res.status(400).json({ message: "missing required field"})
   } else if(!req.body.last_name) {
    return res.status(400).json({ message: "missing required field"})
   } else if(!req.body.zip_code) {
    return res.status(400).json({ message: "missing required field"})
   }
   next();
   }
}

// middleware to handle posting user issue needs to be adjusted

function validateIssueId(req, res, next) {
  const { id } = req.params;
  Issues.findById(id)
  .then(issue => {
    if(issue){
      req.issue = issue;
      next();
    } else {
      res.status(404).json({message: `Issue with the id of ${id} was not found`})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'Could not get issue'})
  });
}

function validateIssue(req, res, next) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing issue data" })
  } else {
   if (!req.body.text) {
    return res.status(400).json({ message: "missing required field" }) // chain else ifs for required fields
  }
  }
  next();
}

function handleUsersLocations(req, res, next) {
  // console.log('zip_code:', req.body.zip_code)
  let { zip_code } = req.body;
  Locations.findBy({ zip_code }).then(location =>{
    // console.log('location findBy in register', location) // check if that zip code is an existing location
    if(location.length < 1){
        Locations.add({ zip_code }) // if not add it
        .then(assignment =>{
            console.log('assignment in add location promise', assignment);
        })
        .catch(err=>{
          res.status(500).json({errorMessage: 'Server failed to find a location, contact backend for support', error: err})
        }) 
    } else {
      console.log(res)
    }
    })
    .catch(err=>{
      res.status(500).json({errorMessage: 'Server failed to find a location, contact backend for support', error: err})
    })
    next();
}