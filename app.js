const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  login,
  logoff,
  createUser,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signout', logoff);
app.post('/signup', createUser);

app.use(require('./middlewares/auth'));
app.use(require('./routers/index'));

app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  if (statusCode === 500) console.log(`Ошибка ${err.name}: ${message}`);

  next();
});

module.exports = app;
