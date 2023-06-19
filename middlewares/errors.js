const {
  IncorrectIdError,
  ServerError,
  NotFoundError,
  ValidationError,
  DublicateUserError,
  WrongAuthError,
} = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  let error;
  switch (err.name) {
    case 'Auth error':
      error = new WrongAuthError(err);
      break;
    case 'Not found':
      error = new NotFoundError(err);
      break;
    case 'CastError:':
      error = new IncorrectIdError(err);
      break;
    case 'Validation Error':
      error = new ValidationError(err);
      break;
    case 'MongoServerError':
      error = new DublicateUserError(err);
      break;
    default:
      error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
