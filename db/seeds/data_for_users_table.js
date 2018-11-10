
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { password: 'iRuleW0RLD' },
        { password: 'ILoveEverybody' },
        { password: 'Moneyi$Everything' },
        { password: 'iMissSpongeBob' },
        { password: 'imTheBe$t@Everything' }
      ])
      .into('users');
    });
};
