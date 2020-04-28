
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {id: 1, zip_code: 53540, title: 'ACE Chemicals', post: 'Can we please just level this place?', userId: 1 , locationsId: 1},
        {id: 2, zip_code: 80537, title: 'Pothole', post: 'Its ruining all the cars!', userId: 4 , locationsId: 3},
        {id: 3, zip_code: 80537, title: 'Dogs barking', post: 'Neighbors dogs never stop barking!', userId: 4 , locationsId: 3},
        {id: 4, zip_code: 80537, title: 'Loud Music', post: 'Good music just too loud', userId: 1 , locationsId: 3},
      ]);
    });
};
