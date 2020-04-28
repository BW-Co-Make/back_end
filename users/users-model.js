const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  getUserIssues
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
    console.log(id)
    return db("issues")
    .join("users", "users.id", "issues.id")
    .where("users.id", id)
    .select("issues.id", "issues.zip_code", "issues.title", "issues.post")
}
