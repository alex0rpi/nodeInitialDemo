const { Users } = require('../models');
const jwt = require('jsonwebtoken');

const createPlayer = async (req, res) => {
  const { username, password } = req.body;
  // Per ara no hi ha validació ni de username ni de password, però en un futur es podria fer.
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
    return res.status(200).json({ message: 'new user created.', created: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating player.', error });
  }
};

// A partir de la creació d'un user, aquest té la possibilitat de fer /login, per poder accedir a la resta d'endpoints.

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw Error('All fields must be filled.');
  }
  // Per ara no hi ha validació ni de username ni de password, però en un futur es podria fer.
  // Així que la condició per a obtenir un token és només que l'usuari existeixi.
  const existingUser = await Users.findOne({ where: { username } });
  if (!existingUser) {
    res.status(404).json({ message: 'User not found, cannot login.' });
  }
  const token = jwt.sign({ _uid: existingUser.id }, process.env.SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'User logged in.', username, token });
  // Authorization: "Bearer " + AuthCtx.token
};

const getPlayers = async (req, res) => {
  try {
    const players = await Users.findAll();
    if (!players) return res.status(404).json({ message: 'No players found.' });
    return res.status(200).json({ players });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting players.', error });
  }
};

const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { newUsername } = req.body;
  try {
    if (id === '0') {
      return res.status(404).json({ message: 'No player found.' });
    }
    const existingUser = await Users.findOne({ where: { id } });
    await Users.update({ username: newUsername }, { where: { id } });
    return res.status(200).json({ message: `Player -${existingUser.username}- updated with new name: ${newUsername}` });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating player.', err });
  }
};

module.exports = { loginUser, createPlayer, getPlayers, updatePlayer };
