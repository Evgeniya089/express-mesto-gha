/* eslint-disable no-undef */
const { conflictCode } = require('./errorCodes');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictCode;
  }
}
module.exports = ConflictErr;
