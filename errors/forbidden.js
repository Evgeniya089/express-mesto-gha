/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const { forbidden } = require('./errorCodes');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbidden;
  }
}
module.exports = Forbidden;
