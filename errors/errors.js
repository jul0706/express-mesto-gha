const IncorrectIdError = require('./IncorrectIdError');
const ServerError = require('./ServerError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const DublicateUserError = require('./DublicateUserError');
const WrongAuthError = require('./WrongAuthError');

module.exports = {
  IncorrectIdError,
  ServerError,
  NotFoundError,
  ValidationError,
  DublicateUserError,
  WrongAuthError,
};
