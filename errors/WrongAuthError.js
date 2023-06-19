class WrongAuth extends Error {
  constructor(err) {
    super(err);
    this.message = 'Неверный логин или пароль';
    this.statusCode = 401;
  }
}

module.exports = WrongAuth;
