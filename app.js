/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const defaultErr = require('./errors/defaultErr');
const { urlRegExp } = require('./middlewares/validation');
const NotFound = require('./errors/notFound');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(urlRegExp),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  createUser
);

app.use(auth);
app.use(router);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

app.use(defaultErr);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(3000, () => {
  console.log('server started on port 3000');
});
