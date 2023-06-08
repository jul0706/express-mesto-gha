const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Iternal server error', err: err.message, stack: err.stack }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send({ data: card }))
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
            message: 'Card not found',
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

const createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not found'))
    .then((newCard) => res.status(201).send(newCard))
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
            message: 'Card not found',
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

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error('Not found'))
    .then((newCard) => res.status(200).send(newCard))
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
            message: 'Card not found',
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
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard,
};
