
exports.up = function(knex, Promise) {
  return knex.schema.table('photos', table => {
    table.string('title', 255);
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('photos', table => {
    table.dropColumn('title');
  }); 
};
