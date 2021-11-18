require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'development-secret' } = process.env;

function getUser(req, res, next) {
  const id = req.user;

  User.findById(id)
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID пользователя невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function updateUser(req, res, next) {
  const { name, email } = req.body;
  const id = req.user;

  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        const err = new Error('Данные невалидны');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

module.exports = {
  getUser,
  updateUser,
};
