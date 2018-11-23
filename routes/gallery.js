const express = require('express');
const User = require('../db/models/User');
const Photo = require('../db/models/Photo');
const router = express.Router();
const auth = require('../utils/auth');


router.get('/new', auth.isAuthenticated, (req, res) => {
  res.render('galleries/new');
});

router.get('/:id', (req, res) => {
  let grabId = req.params.id;

  return new Photo({ id: grabId })
    .fetch({
      columns: ['author', 'link', 'description', 'author_id', 'title']
      //     withRelated: ['photos']
    })
    .then(photo => {
      if (!photo) {
        res.status(404).json({ message: `Photo #${grabId} not found.` });
      } else {
        const locals = photo.serialize();
        res.render('galleries/detail', locals);
      }
    })
    .catch(err => console.log(err));
});

router.post('/', auth.isAuthenticated, (req, res) => {
  let data = req.body;
  console.log('data', data);
  return new Photo({
    author: data.author,
    link: data.link,
    description: data.description,
    author_id: req.user.id,
    title: data.title
  })
    .save()
    //persists the data to the database;
    .then(photo => {
      return res.send('updated');
      //return res.render('user')
    })
    .catch(err => console.log(err))
});

router.get('/:id/edit', auth.isAuthenticated, (req, res) => {
  let userId = req.user.id;
  //let data = req.body;
  let photoId = parseInt(req.params.id);
  //console.log('this is userId', data);
  if (userId === null) {
    return res.redirect(`/gallery/${photoId}`);
  }
  return new Photo({ id: photoId })
    .fetch({
      require: true,
      columns: ['author', 'link', 'description', 'author_id', 'title']
    })
    .then(photo => {
      let photoObj = photo.serialize();
      console.log('this is photoObj', photoObj);
      return res.render('galleries/edit', photoObj);
    })
    .catch(err => console.error(err));
});

router.put('/:id/edit', auth.isAuthenticated, (req, res) => {
  let data = req.body;
  let authId = parseInt(data.author_id);
  let userId = req.user.id;
  //console.log('userid', userId);
  //console.log('this is data', data);
  if (authId !== userId) {
    return res.send({ message: `Incorrect photo edit for User ID:${userId}` });
  }
  return new Photo()
    .where({ author_id: userId })
    .fetch({ require: true })
    .then(photo => {
      photo.save({
        link: data.link,
        description: data.description,
        title: data.title
      })
      return res.send(`Information on photo has been updated for Photo ID: ${photo.id}`);
    })
    .catch(err => console.log(err));
});


router.delete('/:id', auth.isAuthenticated, (req, res) => {
  let reqId = parseInt(req.params.id);
  let userId = req.user.id;
  // add delete button to user's gallery dashboard
  //console.log('this is reqid', reqId, 'this is userid', userId);
  return new Photo()
    .where({ id: reqId })
    .fetch({
      columns: ['id', 'author_id'],
      require: true
    })
    .then((photo) => {
      let photoObj = photo.serialize();
      if (photoObj.author_id === userId) {
        return photo.destroy({
          id: reqId
        })
      } else {
        return res.send(`Unable to delete`);
      }
    })
    .then(() => {
      return res.redirect('/');
    })
    .catch(err => console.error(err));
});


module.exports = router;