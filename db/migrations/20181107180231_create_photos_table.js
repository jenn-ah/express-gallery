
// exports.up = function (knex, Promise) {
//   return knex.schema.createTable('users', table => {
//     table.increments('id');
//     table.string('username', 60).notNullable();
//     table.string('first_name', 60).notNullable();
//     table.string('last_name', 60).notNullable();
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());
//     }); 
//   };

//   exports.down = function (knex, Promise) {
//     return knex.schema.dropTable('users');
//   };



exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', table => {
    table.increments('id');
    table.string('author', 60).notNullable();
    table.string('link', 255).notNullable();
    table.text('description').notNullable();
    table.integer('author_id').unsigned();
    table.foreign('author_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }); 
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
}
