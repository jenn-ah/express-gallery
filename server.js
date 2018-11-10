const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const PORT = process.env.EXPRESS_HOST_PORT;
const app = express();
const galleryRouter = require('./routes/gallery');
const usersRouter = require('./routes/users');
const User = require('./db/models/User');
const Photo = require('./db/models/Photo');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(express.static('public'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'devLeague',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  return new User
    .fetch()
    .where({ id: userId })
    .then(user => {
      if (!user) {
        cb(null);
      }
      cb(null, user);
    });
});


passport.use(new LocalStrategy((username, password, done) => {
  return new User
    .fetch()
    .where({ username: username })
    .then(user => {
      if (!user || (user.password !== password)) {
        return done(null, false);
      } 
      return done(null, user);
    })
    .catch(err => {
      return done(err, null);
    })
}))





app.use('/gallery', galleryRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  //res.send('users router smoke');
  return Photo.fetchAll()
    .then(photos => {
      let results = photos.toJSON();
      //console.log('this is results', {results});
      res.render('galleries/index', { results });
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});