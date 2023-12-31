/* eslint-disable no-undef */
const express = require('express');
const {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateAddCard, validateCardId, validateLikeCard } = require('../middlewares/validation');

const cardsRouter = express.Router();

cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardsRouter.post('/', validateAddCard, createCard);
cardsRouter.delete('/:cardId/likes', validateLikeCard, dislikeCard);

module.exports = cardsRouter;
