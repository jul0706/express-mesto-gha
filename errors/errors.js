const incorrectIdError = require('./IncorrectId');
const serverError = require('./ServerError');
const userNotFoundError = require('./UserNotFound');
const validationError = require('./ValidationError');
const abstractError = require('./AbstractError');

module.exports = {
  incorrectIdError,
  serverError,
  userNotFoundError,
  validationError,
  abstractError,
};
