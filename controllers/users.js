const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => new Error('Not found'))
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'User not found',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({
            message: 'Incorrect ID',
          });
      } else if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'User not found',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

const createUser = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    ({ name: req.body.name, about: req.body.about }),
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((newUser) => res.status(200).send(newUser))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({
            message: 'Incorrect ID',
          });
      } else if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, ({ avatar: req.body.avatar }), { new: true })
    .orFail(() => new Error('Not found'))
    .then((newUser) => res.status(200).send(newUser))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({
            message: 'Incorrect ID',
          });
      } else if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isUserFind) => {
          if (isUserFind) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameAite: true,
            });
            res.status(200).send({ data: user.toJSON() });
          } else {
            res.status(403).send({ message: 'Неправильный пароль' });
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({
            message: 'Incorrect ID',
          });
      } else if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'На сервере произошла ошибка', err: err.message, stack: err.stack,
          });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
