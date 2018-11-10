const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

router.get('/', (req, res) => {
  return User.fetchAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});


router.get('/:id', (req, res) => {
  let grabId = req.params.id;

  return new User({ id: grabId })
    .fetch({
      columns: ['id', 'username', 'first_name', 'last_name'],
      withRelated: ['photos']
    })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: `User ${grabId} not found.` });
      } else {
        const locals = user.serialize();
        res.render('users/detail', locals);
      }
    })
    .catch(err => console.log(err));

  //const locals = user.attributes; user.serialize({ shallow: true }); if you only want top object

  //hbs, res.render('users/detail', locals);
})


router.post('/', (req, res) => {
  let data = req.body;

  return new User({
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    password: data.password
  })
    .save()
    //persists the data to the database;
    .then(user => {
      return res.json(user);
    })
    .catch(err => console.log(err))
});


module.exports = router;