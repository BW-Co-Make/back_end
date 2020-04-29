const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db("issues")
//   .select("id","zip_code", "title", "post", "upvote");
}

function findBy(filter) {
  return db("issues").where(filter);
}

async function add(issue) {
    console.log('issue', issue)
    const [id] = await db("issues").insert(issue, "id");

    return findById(id);
}

function findById(id) {
    console.log(id)
  return db("issues")
    .select("id","zip_code", "title", "post", "upvote")
    .where({ id })
    .first();
};



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



