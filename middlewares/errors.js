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
    case process.env.AUTH_ERROR:
      error = new WrongAuthError(err);
      break;
    case process.env.NOT_FOUND_ERROR:
      error = new NotFoundError(err);
      break;
    case process.env.CAST_ERROR:
      error = new IncorrectIdError(err);
      break;
    case process.env.VALIDATION_ERROR:
      error = new ValidationError(err);
      break;
    case process.env.MONGO_SERVER_ERROR:
      error = new DublicateUserError(err);
      break;
    default:
      error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
