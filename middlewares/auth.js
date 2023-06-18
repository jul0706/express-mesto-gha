const jsonWebToken = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jsonWebToken.verify(token, 'SECRET');
  } catch (err) {
    next(err);
  }
  req.user = payload;

  next();
};

module.exports = auth;
