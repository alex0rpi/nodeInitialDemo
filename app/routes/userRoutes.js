const express = require('express');
const {
  loginUser,
  createUser,
  getUsers,
  updateUsers,
} = require('../controllers/userControllers');
const { validateUser } = require('../middlewares/validateToken');

const router = express.Router();
// En primer lloc, crear un jugador usuari.
router.post('/', createUser); //crea un jugador/a

// Accedir a aquest endoint /login per tal d'obtenir un token i poder fer servir la resta de endpoints.
router.post('/login', loginUser); //autentifica un usuari/a i l'ingressa al sistema

router.get('/', validateUser, getUsers); //retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.

router.put('/:id', validateUser, updateUsers); //modifica el nom del jugador/a.

module.exports = router;
