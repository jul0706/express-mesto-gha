const {
  abstractError,
  incorrectIdError,
  serverError,
  userNotFoundError,
  validationError,
} = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  res.status(500).send({ message: 'Ошибка сервера' });

  next();
};

module.exports = errorHandler;
