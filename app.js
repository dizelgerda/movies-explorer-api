const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(require('./middlewares/auth'));
app.use(require('./routers/index'));

module.exports = app;
