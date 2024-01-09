/* eslint-disable no-undef */
require('dotenv').config();
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
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

app.use(errorLogger);
app.use(errors());

app.use(defaultErr);

app.listen(PORT, () => {
  console.log('server started on port 3000');
});
