const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db("issues").select("id","zip_code", "title", "post", "upvote");
}

function findBy(filter) {
  return db("issues").where(filter);
}

async function add(issue) {
  const [id] = await db("issue").insert(issue, "id");

  return findById(id);
}

function findById(id) {
    console.log(id)
  return db("issues")
    .select("id","zip_code", "title", "post", "upvote")
    .where({ id })
    .first();
};

// function findUserLocation(id) {

//     // What this SHOULD do is grab the locationId from the joint table so I can assign it to the new issue
//     return db("users")
//     .join("users-location as ul", "ul.userId", "users.id")
//     .where("ul.userId", id)
//     .select("ul.locationId", "users.zip_code"); // can select users.zip_code so users don't have to input it
// }


function update(id, changes) {
    return db('issues')
      .where({ id })
      .update(changes);
};



function remove(id) {
    return db('issues')
      .where('id', id)
      .del();
};

// async function addUserIssues(issue){
//     const [id] = await db("issues").insert(issue)
//     return issue;
// }

// function getUserIssues(id){
//     return db("issues")
//     .join("users", "users.id", "issues.id")
//     .where("users.id", id)
//     .select("issues.id", "issues.zip_code", "issues.title", "issues.post")
// };

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