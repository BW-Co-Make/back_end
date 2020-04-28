
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'dark_knight', password: 'waynemanor', first_name: 'Bruce', last_name: 'Wayne', zip_code: 53540, locationsId: 1},
        {id: 2, username: 'clownprince', password: 'hahahahaha', first_name: 'Joker', last_name: 'Unknown', zip_code: 53540, locationsId: 1},
        {id: 4, username: 'manofsteel', password: 'MARTHA', first_name: 'Clark', last_name: 'Kent', zip_code: 6290, locationsId: 2},
        {id: 5, username: 'lexluthor', password: 'kryptonite', first_name: 'Clark', last_name: 'Kent', zip_code: 6290, locationsId: 2},
        {id: 6, username: 'spiderman', password: 'radioactive', first_name: 'Peter', last_name: 'Parker', zip_code: 80537, locationsId: 2},
      ]);
    });
};

