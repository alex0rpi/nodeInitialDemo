const userController = (req, res) => {
  return res.json({
    nom: 'Alex',
    edat: 49,
    url: req.protocol + '://' + req.get('host') + req.originalUrl,
  });
};

const timeController = (req, res) => {
  const { username } = req.body;
  return res.json({ username, time: new Date().toLocaleString() });
};

module.exports = { userController, timeController };
