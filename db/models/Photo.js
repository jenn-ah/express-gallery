const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  // constructor() {
  //   super();
  // }
  get tableName() { return 'photos' };
  get hasTimestamps() { return true }

  // posts() {
  //   return this.hasMany('Post', 'author_id');
  // }

}

module.exports = bookshelf.model('Photo', Photo);