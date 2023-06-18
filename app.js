require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errors');

const app = express();

mongoose.connect(process.env.BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT);
