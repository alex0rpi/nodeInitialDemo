const timeController = (req, res) => {
  const { username } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: 'Please include a username object in your req.body ({"username":"alex"})' });
  return res.json({ username, time: new Date().toLocaleString() });
};

module.exports = { timeController };
