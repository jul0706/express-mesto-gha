const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');

const { BASE_URL_DB = 'mongodb://127.0.0.1/mestodb' } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(PORT);
