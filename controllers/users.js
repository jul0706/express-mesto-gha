const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      const err = new Error();
      err.name = 'Not found';
      next(err);
    })
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      const err = new Error();
      err.name = 'Not found';
      next(err);
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  if (!req.body.password) {
    const err = new Error();
    err.name = 'ValidationError';
    next(err);
  }
  bcrypt.hash(String(req.body.password), 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res
        .status(201)
        .send(user.toJSON());
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    ({ name: req.body.name, about: req.body.about }),
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error();
      err.name = 'Not found';
      next(err);
    })
    .then((newUser) => res.status(200).send(newUser))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, ({ avatar: req.body.avatar }), { new: true })
    .orFail(() => {
      const err = new Error();
      err.name = 'Not found';
      next(err);
    })
    .then((newUser) => res.status(200).send(newUser))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      const err = new Error();
      err.name = 'Auth error';
      next(err);
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isUserFind) => {
          if (isUserFind) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, process.env.JWT_SECRET);
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.status(200).send({ token: jwt });
          } else {
            const err = new Error();
            err.name = 'Auth error';
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
