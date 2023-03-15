const express = require('express');
const { loginUser, createPlayer, getPlayers, updatePlayer } = require('../controllers/playerControllers');
const validateUser = require('../middlewares/validateToken');

const router = express.Router();

// En primer lloc, crear un jugador usuari.
router.post('/', createPlayer); //crea un jugador/a.

// Accedir a aquest endoint /login per tal d'obtenir un token i poder fer servir la resta de endpoints.
router.post('/login', loginUser); //autentifica un jugador/a i l'ingressa al sistema

router.put('/:id', updatePlayer); //modifica el nom del jugador/a.

router.get('/', getPlayers); //retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.

module.exports = router;
