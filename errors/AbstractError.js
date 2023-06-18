class AbstractError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Неизвестная ошибка';
  }
}

module.exports = AbstractError;
