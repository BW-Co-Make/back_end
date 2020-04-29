const db = require("../data/dbConfig.js");
const Locations = require("../locations/locations-model") // requiring this model to add location if it does not exist on register

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserLocation,
  update,
  remove,
  getUserIssues
//   updateIssues,
//   removeIssue
};

function find() {
  return db("users").select("id", "username", "first_name", "last_name", "zip_code");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id"); // add user to users table
  console.log('Should be first, id:', id)
  console.log('zip_code:', user.zip_code)
  let { zip_code } = user
  let userLocation = {
    usersId: id
}; // initialize object with usersId to later insert into users_location table
  Locations.findBy({ zip_code }).then(location =>{
    console.log('location findBy in register', location) // check if that zip code is an existing location
    if(location.length < 1){
        Locations.add({ zip_code }) // if not add it
        .then(([assignment]) =>{
            console.log('assignment in add location promise', assignment);
            userLocation.locationsId = assignment.id // assign the id of returned location to userLocation
        })
        .catch(err=>{
            console.log(err);
        }) 
    } else {
        console.log('why this?')
        userLocation.locationsId = location[0].id // assign location
    }
    })
    .catch(err=>{
        console.log(err);
    })
    console.log('What userLocation looks like after registering', userLocation)
    await usersLocations(userLocation) // insert userLocation into users_locations
  return findById(id);
}

function findById(id) {
  return db("users")
    .select("id", "username", "first_name", "last_name", "zip_code")
    .where({ id })
    .first();
};

function findUserLocation(id) {
    console.log('2', id)
    // What this SHOULD do is grab the locationId from the joint table so I can assign it to the new issue
    return db("users")
    .join("users_locations as ul", "ul.usersId", "users.id")
    .where("ul.usersId", id)
    .select("ul.locationsId", "users.zip_code"); // can select users.zip_code so users don't have to input it
  }


function update(id, changes) {
    return db('users')
      .where({ id })
      .update(changes);
};



function remove(id) {
    return db('users')
      .where('id', id)
      .del();
};



function getUserIssues(id){
    return db("users")
    .join("issues", "issues.userId", "users.id")
    .where("users.id", id)
    .select("issues.id", "issues.zip_code", "issues.title", "issues.post")
};

async function usersLocations(connection) {
    const [id] = await db("users_locations").insert(connection, "id");
    return findById(id); // not sure what to return
  }

// function updateIssues(id, changes) {
//     return db('issues')
//       .where({ id })
//       .update(changes);
// };

// function removeIssue(id) {
//     return db('issues')
//       .where('id', id)
//       .del();
// };
