const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());

module.exports = app;
