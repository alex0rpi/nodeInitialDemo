const express = require('express');
const path = require('path');
const checkHeader = require('../middlewares/checkHeaderMdw');
const addCacheControl = require('../middlewares/cacheControlMdw');
const { userController, timeController } = require('../controllers/userController');
const { uploadFile } = require('../controllers/uploadController');
const {findPokemon} = require('../controllers/pokemonController')

const router = express.Router();

router.get('/user', userController);

router.post('/upload', uploadFile);

router.post('/time', addCacheControl, checkHeader, timeController);

/* Crea una petició GET a l'endpoint /pokemon/{id} que rebi un número de Pokémon, 
faci una cerca al Pokémon API i retorni el nom del Pokémon, la seva alçada i el seu pes. */
router.get('/pokemon/:id', findPokemon)

module.exports = router;