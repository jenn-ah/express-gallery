const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const PORT = process.env.EXPRESS_HOST_PORT;
const app = express();
const galleryRouter = require('./routes/gallery');
const usersRouter = require('./routes/users');

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/gallery', galleryRouter);
app.use('/users', usersRouter);


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