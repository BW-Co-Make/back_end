const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserLocation,
  update,
  remove,
  addUserIssues,
  getUserIssues,
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
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .select("id", "username", "first_name", "last_name", "zip_code")
    .where({ id })
    .first();
};

function findUserLocation(id) {

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

async function addUserIssues(issue){
    const [id] = await db("issues").insert(issue)
    return issue;
}

function getUserIssues(id){
    return db("issues")
    .join("users", "users.id", "issues.id")
    .where("users.id", id)
    .select("issues.id", "issues.zip_code", "issues.title", "issues.post")
};

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
