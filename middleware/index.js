const Users = require('../users/users-model')

module.exports = {
    validateUser,
    validateUserId,
    validateIssue
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
        res.status(400).json({message: `User with the id of ${id} was not found`})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not get user'})
    });
}

function validateUser(req, res, next) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: "missing user data" })
   } else {
    if (!req.body.name) {
     return res.status(400).json({ message: "missing required name field" })
   }
   next();
   }
}

// middleware to handle posting user issue needs to be adjusted

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