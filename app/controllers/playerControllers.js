const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createPlayer = async (req, res) => {
  const { username, password } = req.body;
  // Per ara no hi ha validació ni de username ni de password, però en un futur es podria fer.
  if (!password || password.trim() === '') return res.status(404).json({ message: 'Password is required.' });
  if (!username || username.trim() === '') username = 'ANÒNIM';
  try {
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(404).json({
        message:
          'Username already taken, try another one, or leave it blank and "ANÒNIM" will be assigned for you.',
        created: false,
      });
    }
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    await Users.create({ username, pwd: hashedPw });
    return res.status(200).json({ message: 'new user created.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating player.', error });
  }
};

// A partir de la creació d'un user, aquest té la possibilitat de fer /login, per poder accedir a la resta d'endpoints.

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw Error('Incorrect fields provided (username and/or password.');
  }
  // Condicions per obtenir token: que un username existent introdueixi la seva contrasenya.
  const existingUser = await Users.findOne({ where: { username } });
  if (!existingUser) {
    res.status(404).json({ message: 'User not found, cannot login.' });
  }
  // Check password
  const isMatch = await bcrypt.compare(password, existingUser.pwd);
  if (!isMatch) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }
  // jwt creation ---------------------
  const token = jwt.sign({ username: existingUser.username, _uid: existingUser.id }, process.env.SECRET, {
    expiresIn: '1h',
  });
  // #############################
  res.setHeader('authorization', 'Bearer ' + token);
  // #############################
  res.status(200).json({ message: 'User logged in!!.', username, token });
};

const logOutUser = async (req, res) => {
  // #############################
  res.removeHeader('authorization'); // <-- token removed on req.header.
  // #############################
  res.status(200).json({ message: 'User LOGGED OUT; token removed from authorization header.' });
};

const getPlayers = async (req, res) => {
  try {
    const players = await Users.findAll();
  
    if (!players) return res.status(404).json({ message: 'No players found.' });
    return res.status(200).json({ players });
  } catch (error) {
    console.log(error);
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
    return res
      .status(200)
      .json({ message: `Player -${existingUser.username}- updated with new name: ${newUsername}` });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating player.', err });
  }
};

module.exports = { loginUser, logOutUser, createPlayer, getPlayers, updatePlayer };
