const jsonWebToken = require('jsonwebtoken');

const { JWT_SECRET = 'SECRET' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jsonWebToken.verify(token, JWT_SECRET);
  } catch (err) {
    err.name = 'Auth error';
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
