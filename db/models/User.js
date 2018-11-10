const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  // constructor() {
  //   super();
  // }
  get tableName() { return 'users' };
  get hasTimestamps() { return true }

  photos() {
    return this.hasMany('Photo', 'author_id');
  }

}

module.exports = bookshelf.model('User', User);