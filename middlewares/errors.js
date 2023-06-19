const {
  IncorrectIdError,
  ServerError,
  NotFoundError,
  ValidationError,
  DublicateUserError,
  WrongAuthError,
} = require('../errors/errors');

const { NOT_FOUND_ERROR = 'NotFound' } = process.env;
const { CAST_ERROR = 'CastError' } = process.env;
const { VALIDATION_ERROR = 'ValidationError' } = process.env;
const { MONGO_SERVER_ERROR = 'MongoServerError' } = process.env;

const errorHandler = (err, req, res, next) => {
  let error;
  switch (err.name) {
    case process.env.AUTH_ERROR:
      error = new WrongAuthError(err);
      break;
    case NOT_FOUND_ERROR:
      error = new NotFoundError(err);
      break;
    case CAST_ERROR:
      error = new IncorrectIdError(err);
      break;
    case VALIDATION_ERROR:
      error = new ValidationError(err);
      break;
    case MONGO_SERVER_ERROR:
      error = new DublicateUserError(err);
      break;
    default:
      error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
