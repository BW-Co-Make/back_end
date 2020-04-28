
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: 1, zip_code: 53540},
        {id: 2, zip_code: 62960},
        {id: 3, zip_code: 80537},
      ]);
    });
};
