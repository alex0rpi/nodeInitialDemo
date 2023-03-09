const userController = (req, res) => {
  return res.json({
    nom: 'Alex',
    edat: 49,
    url: req.protocol + '://' + req.get('host') + req.originalUrl,
  });
};

module.exports = { userController };
