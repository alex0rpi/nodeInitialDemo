/* const checkHeader = (req, res, next) => {
  if (!req.headers['username'] || !req.headers['password']) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  next()
}; */

/* Feedback de l'Oriol:
MW ha de buscar req.headers.authorization on hi ha el usuari i contrassenya concatenats amb :, en base64.
És el que s'envia quan al postman vas a authorization->basic Auth. 
El MW ha de buscar que hi sigui, i que els valors siguin els que tu vulguis, per exemple Admin:1234. 
*/

const { Buffer } = require('node:buffer');

const checkHeader = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const auth = req.headers['authorization'].split(' ');
  console.log(auth);
  const [username, password] = Buffer.from(auth[1], 'base64').toString().split(':');
  if (username !== 'alex' || password !== 'alex123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

module.exports = checkHeader;
