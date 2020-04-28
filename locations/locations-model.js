const db = require("../data/dbConfig.js");

module.exports = {
	add,
  find,
  findBy,
  findById,
  update,
  remove,
  getLocationIssues,
};

function find() {
  return db("locations").select('*');
}

function findBy(filter) {
  return db("locations").where(filter);
}

async function add(location) {
  const [id] = await db("locations").insert(location, "id");

  return findById(id);
}

function findById(id) {
  return db('locations')
    .select('*')
    .where({ id })
    .first();
}

function getLocationIssues(id) {
	return db('locations')
		.join('issues', 'issues.locationsId', 'locations.id')
		.where('locations.id', id)
		.select('*')
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