require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  login,
  logoff,
  createUser,
} = require('./controllers/users');

const { BD_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(BD_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(9),
  }),
}), login);
app.post('/signout', logoff);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(9),
  }),
}), createUser);

app.use(require('./middlewares/auth'));
app.use(require('./routers/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/handlerErrors'));

module.exports = app;
