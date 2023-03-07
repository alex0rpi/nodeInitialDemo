const express = require('express');
const {
  userPlays,
  deleteUserGames,
  getUserGames,
  getRanking,
  getWorstPlayer,
  getBestPlayer,
} = require('../controllers/gameControllers');

const router = express.Router();

router.post('/games/:id', userPlays); //un jugador/a específic realitza una tirada.

router.delete('/games/:id', deleteUserGames); //elimina les tirades del jugador/a.

router.get('/games/:id', getUserGames); //retorna el llistat de jugades per un jugador.

router.get('/ranking', getRanking); //retorna un ranking de jugadors ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors.

router.get('/ranking/loser', getWorstPlayer); //retorna el jugador/a amb pitjor percentatge d’èxit.

router.get('/ranking/winner', getBestPlayer); //retorna el jugador/a amb millor percentatge d’èxit.

module.exports = router;
