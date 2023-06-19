class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Данные не найдены';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
