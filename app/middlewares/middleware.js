const checkHeader = (req, res) => {
  // check if there's no authorization header
  if (!req.headers(['authorization'])) {
    res.status(401).json({
      code: 401,
      message:
        'la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).',
    });
    return;
  }

  // in case it exists check if it is of 'Basic' type
};
