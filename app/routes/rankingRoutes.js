const express = require('express');
const { getRanking, getWorstPlayer, getBestPlayer } = require('../controllers/rankingControllers');
const { validateUser } = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateUser);

router.get('/', getRanking); //retorna un ranking de jugadors ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors.

router.get('/loser', getWorstPlayer); //retorna el jugador/a amb pitjor percentatge d’èxit.

router.get('/winner', getBestPlayer); //retorna el jugador/a amb millor percentatge d’èxit.

module.exports = router;
