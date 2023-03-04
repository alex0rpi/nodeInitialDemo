const express = require('express');
const { createPlayer, getPlayers, updatePlayer } = require('../controllers/playerController');
const router = express.Router();

router.post('/players', createPlayer);

router.get('/players', getPlayers);

router.put('/players/:id', updatePlayer);

module.exports = router;
