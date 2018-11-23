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
const bcrypt = require('bcrypt');
const redis = require('connect-redis')(session);
const methodOverride = require('method-override');

const saltRounds = 12;

app.use(express.static('public'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: new redis({ url: 'redis://redis-server:6379', logErrors: true }),
  secret: 'devLeague',
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use((req, res, next) => {
  console.log('method', req.method);
  console.log('path', req.path);
  console.log('url', req.url);
  next();
});
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
  new User()
    .where({ username })
    .fetch()
    .then(user => {
      if (!user) {
        return done(null, false, { message: `Incorrect username/password` });
      }
      else {
        bcrypt.compare(password, user.attributes.password)
          .then(res => {
            if (res) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' })
            }
          });
      }
    });
}));

app.get('/register', (req, res) => {
  res.render('users/register');
});

app.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash
      })
        .save()
        .then((user) => {
          console.log(user);
          res.redirect('/');
        })
    });
  });
});

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

app.get('/login', (req, res) => {
  res.redirect('/login.html');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login.html'
}));

// app.get('/users/:id', auth.isAuthenticated, (req, res) => {
//   // const { user } = req;
//   // const userObj = user.serialize();
//   //res.send(`You have access: ${userObj.id} ${userObj.username}`);
//   //console.log('this is userObj', userObj);
// });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});
