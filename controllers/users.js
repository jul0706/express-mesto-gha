const User = require('../models/user');

const getUsers = ('/users', (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Iternal server error', err: err.message, stack: err.stack }));
});

const getUserById = ('/users/:id', (req, res) => {
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
});

const createUser = ('/users', (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: 'Iternal server error', err: err.message, stack: err.stack }));
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
