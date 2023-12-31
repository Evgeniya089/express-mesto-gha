/* eslint-disable no-undef */
const cardSchema = require('../models/card');
const Forbidden = require('../errors/forbidden');
// eslint-disable-next-line no-undef
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');

// eslint-disable-next-line no-undef
module.exports.getAllCards = (req, res, next) => {
  cardSchema
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  cardSchema.create({ name, link, owner: _id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании карточки'));
      } else {
        next(error);
      }
    });
};

// eslint-disable-next-line no-undef
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new Forbidden('Запрещено');
      }
      card.deleteOne()
        .then(() => res.status(200).send({ message: 'Карточка удалена' }))
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Неверный id'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema
    .findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

// eslint-disable-next-line no-undef
module.exports.dislikeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};