const jsonWebToken = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.name = 'Auth error';
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
