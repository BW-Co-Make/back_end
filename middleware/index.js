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