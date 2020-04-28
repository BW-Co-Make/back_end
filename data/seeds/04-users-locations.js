
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users-locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('users-locations').insert([
        {id: 1, usersId: 1, locationsId: 1},
        {id: 2, usersId: 2, locationsId: 1},
        {id: 3, usersId: 4, locationsId: 2},
        {id: 4, usersId: 5, locationsId: 2},
        {id: 5, usersId: 6, locationsId: 3}
      ]);
    });
};
