const express = require('express');
const auth = require('./utils/auth');
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
  return new User()
    .where({ id: userId })
    .fetch()
    .then(user => {
      if (!user) {
        cb(null);
      }
      cb(null, user);
    });
});


passport.use(new LocalStrategy((username, password, done) => {
  return new User()
    .where({ username })
    .fetch()
    .then(user => {
       if (!user) {
        return done(null, false);
       }
      let userObj = user.serialize();
      if (userObj.password !== password) {
        return done(null, false);
      }
      return done(null, userObj);
    })
    .catch(err => {
      return done(err, null);
    })
}));

app.use('/gallery', galleryRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  return Photo.fetchAll()
    .then(photos => {
      let results = photos.toJSON();
      res.render('galleries/index', { results });
    })
    .catch(err => console.log(err));
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/login.html'
}));


app.get('/success', auth.isAuthenticated, (req, res) => {
  const { user } = req;
  const userObj = user.serialize();
  res.send(`You have access: ${userObj.id} ${userObj.username}`);
  console.log('this is userObj', userObj);
});


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});
