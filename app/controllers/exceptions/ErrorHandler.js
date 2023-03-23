// This file contains customized classes that extend the Error class.

class NotCorrectParamsError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = NotCorrectParamsError;
