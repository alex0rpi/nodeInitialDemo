const express = require('express');
const path = require('path');
const checkHeader = require('../middlewares/checkHeaderMdw');
const addCacheControl = require('../middlewares/cacheControlMdw');
const { userController, timeController, uploadFile, findPokemon} = require('../controllers');

const router = express.Router();

router.get('/user', userController);

router.post('/upload', uploadFile);

router.post('/time', addCacheControl, checkHeader, timeController);

router.get('/pokemon/:id', findPokemon);

module.exports = router;