const express = require('express');
const User = require('../db/models/User');
const Photo = require('../db/models/Photo');
const router = express.Router();


// router.get('/new', (req, res) => {
//   //res.send('users router smoke');
//   return Photo.fetchAll()
//     .then(photos => {
//       res.json(photos);
//     })
//     .catch(err => console.log(err));
// });

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

router.post('/', (req, res) => {
  let data = req.body;
  console.log('data', data);
  return new Photo({
    author: data.author,
    link: data.link,
    description: data.description,
    author_id: data.author_id, 
    title: data.title
  })
    .save()
    //persists the data to the database;
    .then(photo => {
      return res.json(photo);
    })
    .catch(err => console.log(err))
});

module.exports = router;