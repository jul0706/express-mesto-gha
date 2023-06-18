class ServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Ошибка сервера';
    this.statusCode = 500;
  }
}

module.exports = ServerError;
