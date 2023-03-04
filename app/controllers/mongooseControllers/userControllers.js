const { Users } = require('../../models/mongooseModels/userModel');

const createPlayer = async (req, res) => {
  const { username } = req.body;
  const existingUser = await Users.findOne({ where: { username: username } });

  if (existingUser) {
    res.status(404).json({
      message: 'Username already taken, try another one ;)',
      created: false,
    });
    return;
  }
  await Users.create({ username: username });
  res.status(200).json({ message: 'new user created', created: true });
};

const getPlayers = (req, res) => {};

const updatePlayer = (req, res) => {};

module.exports = { createPlayer, getPlayers, updatePlayer };
