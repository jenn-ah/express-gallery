
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'SpongeBob', 
          first_name: 'Sponge',
          last_name: 'Bob',
          password: 'iamspongebob',
        },
        {
          username: 'PatrickStarr', 
          first_name: 'Patrick',
          last_name: 'Starr',
          password: 'iampatrickstarr',
        },
        {
          username: 'SquidWard', 
          first_name: 'Squid',
          last_name: 'Ward',
          password: 'iamsquidward',
        },
        {
          username: 'MrKrabs', 
          first_name: 'Mr',
          last_name: 'Krabs',
          password: 'iammrkrabs',
        },
        {
          username: 'PlankTon', 
          first_name: 'Plank',
          last_name: 'Ton',
          password: 'iamplankton',
        },
        {
          username: 'SandyCheeks', 
          first_name: 'Sandy',
          last_name: 'Cheeks',
          password: 'iamsandycheeks',
        }
      ]);
    });
};
