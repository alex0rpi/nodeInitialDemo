const express = require('express');
const { createPlayer, getPlayers, updatePlayer } = require('../controllers/userControllers');
const router = express.Router();

router.post('/players', createPlayer); //crea un jugador/a.

router.put('/players/:id', updatePlayer); //modifica el nom del jugador/a.

router.get('/players', getPlayers); //retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.

module.exports = router;
