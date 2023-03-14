const express = require('express');
const { createPlayer, getPlayers, updatePlayer } = require('../controllers/playerControllers');
const router = express.Router();

router.post('/', createPlayer); //crea un jugador/a.

router.put('/:id', updatePlayer); //modifica el nom del jugador/a.

router.get('/', getPlayers); //retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.

module.exports = router;
