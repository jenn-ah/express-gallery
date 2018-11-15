const express = require('express');
const User = require('../db/models/User');
const router = express.Router();
const auth = require('../utils/auth');

router.get('/', (req, res) => {
  return User.fetchAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

router.get('/:id', auth.isAuthenticated, (req, res) => {
  let grabId = req.params.id;

  if (req.user.id !== parseInt(grabId)) {
    res.redirect('/users')
  }
  return new User()
    .where({ id: grabId })
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
        //add edit button, redirect to put method
      }
    })
    .catch(err => console.log(err));
  //const locals = user.attributes; user.serialize({ shallow: true }); if you only want top object
  //hbs, res.render('users/detail', locals);
});


router.get('/:id/edit', auth.isAuthenticated, (req, res) => {
  let grabId = req.params.id;

  if (req.user.id !== parseInt(grabId)) {
    res.redirect(`/users/${grabId}`);
  }
  return new User({ id: grabId })
    .fetch({
      require: true,
      columns: ['id', 'username', 'first_name', 'last_name']
    })
    .then(user => {
      let userObj = user.serialize();
      res.render('users/edit', userObj);
    })
    .catch(err => console.error(err));
})


router.put('/:id/edit', auth.isAuthenticated, (req, res) => {
  let reqId = parseInt(req.params.id);
  let userId = req.user.id;
  let data = req.body;

  if (userId !== reqId) {
    res.send({ message: `Please return to the login page` });
  }
  return new User()
    .where({ id: userId })
    .fetch({ require: true })
    .then(user => {
      user.save({
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name
      })
      res.send(`Information has been updated for User ID: ${user.id}`);
      //let userObj = user.serialize();
      //let userObj = user.serialize();
      //console.log('this is user editobj', userObj);
    })
    .catch(err => console.log(err));
});


// router.post('/', (req, res) => {
//   let data = req.body;
//   return new User({
//     username: data.username,
//     first_name: data.first_name,
//     last_name: data.last_name,
//     password: data.password
//   })
//     .save()
//     //persists the data to the database;
//     .then(user => {
//       return res.json(user);
//     })
//     .catch(err => console.log(err))
// });


module.exports = router;