const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const {BASE_URL_DB = 'mongodb://localhost:27017/mestodb'} = process.env;
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(router);

app.listen(PORT);