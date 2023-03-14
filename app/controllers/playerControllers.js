const { Users } = require('../models');

const createPlayer = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  if (username === null || username === '') username = 'ANÒNIM';
  try {
    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      return res.status(404).json({
        message: 'Username already taken, try another one ;)',
        created: false,
      });
    }
    await Users.create({ username });
    return res.status(200).json({ message: 'new user created', created: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating player', error });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await Users.findAll();
    if (!players) return res.status(404).json({ message: 'No players found' });
    return res.status(200).json({ players });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting players', error });
  }
};

const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { newUsername } = req.body;
  try {
    if (id === '0') {
      return res.status(404).json({ message: 'No player found' });
    }
    const existingUser = await Users.findOne({ where: { id } });
    await Users.update({ username: newUsername }, { where: { id } });
    return res
      .status(200)
      .json({ message: `Player -${existingUser.username}- updated with new name: ${newUsername}` });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating player', err });
  }
};

module.exports = { createPlayer, getPlayers, updatePlayer };
