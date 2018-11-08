
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username', 60).notNullable();
    table.string('first_name', 60).notNullable();
    table.string('last_name', 60).notNullable();
    table.integer('posting_id').unsigned();
    table.foreign('posting_id').references('id').inTable('photos');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    }); 
  };

  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
  };
