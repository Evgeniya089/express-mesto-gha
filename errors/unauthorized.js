// eslint-disable-next-line no-undef
const { unauthorized } = require('./errorCodes');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorized;
  }
}
// eslint-disable-next-line no-undef
module.exports = Unauthorized;