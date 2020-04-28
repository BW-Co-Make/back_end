const router = require("express").Router();
const Locations = require("./locations-model.js");

const check = require('../middleware/index')

//All Locations
router.get("/", (req, res) => {
  Locations.find()
    .then(locations => {
      res.status(200).json(locations);
    })
    .catch(err => {
    	console.log(err);
      res.status(500).json({error: 'Server could not get Locations'})
    })
});

//Get by locationsId
router.get("/:id", (req, res) => {  
  Locations.findById(req.params.id)
  	.then(locations => {
  		res.status(200).json(locations);
  	})
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({error: 'Server could not get Location'})
  	})
});

//All Location Issues (By locationsId)
router.get("/issues/:id", (req, res) => {  
  Locations.getLocationIssues(req.params.id)
  	.then(locations => {
  		res.status(200).json(locations);
  	})
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({error: 'Server could not get location issues'})
  	})
});

//Update Location
router.put('/:id', (req, res) => {
	Locations.update(req.params.id, req.body)
	.then(locations => {
		res.status(200).json(locations)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: "Server could not update locations"})
	});
});

//Delete Location
router.delete('/:id', (req, res) => {
	Locations.remove(req.params.id)
	.then(locations => {
		res.status(200).json({message: 'The locations was successfully deleted'})
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({error: "Server failed to remove the location"})
	})
});

module.exports = router;