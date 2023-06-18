class ValidationError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
