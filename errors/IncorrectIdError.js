class IncorrectIdError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Передан некорректный ID';
    this.statusCode = 400;
  }
}

module.exports = IncorrectIdError;
