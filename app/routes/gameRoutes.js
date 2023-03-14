const express = require('express');
const { userPlays, deleteUserGames, getUserGames } = require('../controllers/gameControllers');

const router = express.Router();

router.post('/:id', userPlays); //un jugador/a específic realitza una tirada.

router.delete('/:id', deleteUserGames); //elimina les tirades del jugador/a.

router.get('/:id', getUserGames); //retorna el llistat de jugades per un jugador.

module.exports = router;
