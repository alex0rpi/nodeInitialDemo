const checkHeader = (req, res) => {
  // check if there's no authorization header
  if (!req.header('Authorization')) {
    res.status(401).json({
      code: 401,
      message:
        'la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).',
    });
    return;
  }

  const authHeader = req.header('authorization').split(' ');

  // in case it exists check if it is of 'Basic' type
  if (authHeader.length !== 2 || authHeader[1] !== 'Basic') {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }
  next;
};

module.exports = checkHeader;
