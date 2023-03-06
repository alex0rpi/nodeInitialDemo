const userController = (req, res) => {
  console.log(req)
  res.json({
    nom: 'Alex',
    edat: 49,
    url: req.url,
  });
};

const timeController = (req, res) => {
  const { username } = req.body;
  res.json({ username, time: new Date().toLocaleString() });
};

module.exports = { userController, timeController };
