const { userController } = require('./userController');
const { timeController } = require('./timeController');
const { uploadFile } = require('./uploadController');
const { findPokemon } = require('./pokemonController');
// Except for the notFoundController, which will be imported separately app.js.

module.exports = {
  userController,
  timeController,
  uploadFile,
  findPokemon,
};

