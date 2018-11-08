const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.EXPRESS_HOST_PORT;
const app = express();
const galleryRouter = require('./routes/gallery');


app.use(bodyParser.urlencoded({ extended: true}));
app.use('/gallery', galleryRouter);


app.get('/', (req, res) => {
  return Photo.fetchAll()
    .then(photos => {
      res.json(photos);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});