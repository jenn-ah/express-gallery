const express = require('express');
const User = require('../db/models/User');
const Photo = require('../db/models/Photo');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send('users router smoke');
  return Photo.fetchAll()
    .then(photos => {
      res.json(photos);
    })
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  let data = req.body;
  data.description = data.description.toString();
  console.log('data', data);
  return new Photo({
    author: data.author,
    link: data.link,
    description: data.description,
    author_id: data.author_id
  })
    .save()
    //persists the data to the database;
    .then(photo => {
      return res.json(photo);
    })
    .catch(err => console.log(err))
})

module.exports = router;