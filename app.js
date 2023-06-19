require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errors');

const app = express();
const { BASE_URL_DB = 'mongodb://127.0.0.1/mestodb' } = process.env;

mongoose.connect(BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(process.env.PORT);
