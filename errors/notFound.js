// eslint-disable-next-line no-undef
const { notFound } = require('./errorCodes');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}
// eslint-disable-next-line no-undef
module.exports = NotFound;
