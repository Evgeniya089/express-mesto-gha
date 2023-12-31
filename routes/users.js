/* eslint-disable no-undef */
const express = require('express');
const {
  getUsers,
  getUserById,
  editUserProfile,
  editAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { validateUserById, validateAvatar, validateEditProfile } = require('../middlewares/validation');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validateUserById, getUserById);
usersRouter.patch('/me', validateEditProfile, editUserProfile);
usersRouter.patch('/me/avatar', validateAvatar, editAvatar);

module.exports = usersRouter;
