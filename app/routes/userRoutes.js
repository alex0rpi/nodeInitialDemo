const express = require('express');
const {
  loginUser,
  logOutUser,
  createPlayer,
  getPlayers,
  updatePlayer,
} = require('../controllers/playerControllers');
const { validateUser } = require('../middlewares/validateToken');

const router = express.Router();

// En primer lloc, crear un jugador usuari.
router.post('/', createPlayer); //crea un jugador/a

// Accedir a aquest endoint /login per tal d'obtenir un token i poder fer servir la resta de endpoints.
router.post('/login', loginUser); //autentifica un usuari/a i l'ingressa al sistema

// El següent endpoint normalment és necessari però en el cas d'aquesta app només cal que 
router.get('/logout', logOutUser); //desautentifica un usuari/a nul·litzant l'authorization header.

router.get('/', validateUser, getPlayers); //retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.

router.put('/:id', validateUser, updatePlayer); //modifica el nom del jugador/a.

module.exports = router;
