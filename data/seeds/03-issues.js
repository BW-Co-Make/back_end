
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {id: 1, zip_code: 53540, title: 'ACE Chemicals', post: 'Can we please just level this place?', userId: 1 , locationsId: 1},
      ]);
    });
};
