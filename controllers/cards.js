const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NOT_FOUND_ERROR;
      next(err);
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        res
          .status(200)
          .send({ data: card });
      } else {
        const err = new Error();
        err.name = process.env.UNAUTHORIZED_ERROR;
        next(err);
      }
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NOT_FOUND_ERROR;
      next(err);
    })
    .then((newCard) => res.status(201).send(newCard))
    .catch(next);
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NOT_FOUND_ERROR;
      next(err);
    })
    .then((newCard) => res.status(200).send(newCard))
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard,
};
