class ServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'На сервере произошла ошибка';
    this.statusCode = 500;
  }
}

module.exports = ServerError;
