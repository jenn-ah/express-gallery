const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.EXPRESS_HOST_PORT;
const app = express();
// const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');

app.use(bodyParser.urlencoded({ extended: true}));
// app.use('/users', usersRouter);
// app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('smoke test');
});

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});