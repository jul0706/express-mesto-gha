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
            message: 'Iternal server error', err: err.message, stack: err.stack,
          });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
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
            message: 'Iternal server error', err: err.message, stack: err.stack,
          });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
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
  User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true })
    .orFail(() => new Error('Not found'))
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
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

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, ({ avatar: req.body.avatar }), { new: true })
    .orFail(() => new Error('Not found'))
    .then((newUser) => res.status(200).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Incorrect data',
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
