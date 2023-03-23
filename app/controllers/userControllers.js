const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userRepository } = require('../infrastructure/dependecy-injection');
const NotCorrectParamsError = require('./exceptions/ErrorHandler');
require('dotenv').config(); // only needed to require it here

const createUser = async (req, res) => {
  try {
    let { username, password } = req.body;
    // Per ara no hi ha validació ni de username ni de password, però en un futur es podria fer.
    if (!password || password.trim() === '') throw new NotCorrectParamsError('Password is required.');
    if (!username || username.trim() === '') username = 'ANÒNIM';
    const existingUser = await userRepository.retrieveByName(username);
    if (existingUser && existingUser.username !== 'ANÒNIM') {
      throw new NotCorrectParamsError(
        'Username already taken, try another one, or leave it blank and -ANÒNIM- will be assigned for you.'
      );
    }
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    userRepository.create(username, hashedPw);
    return res.status(200).json({ message: `new user -${username}- created. ` });
  } catch (error) {
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(404).json({ error });
  }
};

// Once a user has been created, it has the possibility to do /login, in order to access the rest of the endpoints.
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new NotCorrectParamsError('Incorrect fields provided (username and/or password.');

    const existingUser = await userRepository.retrieveByName(username);
    if (!existingUser) throw new NotCorrectParamsError('User not found, cannot login.');

    const isMatch = await bcrypt.compare(password, existingUser.pwd);
    if (!isMatch) throw new NotCorrectParamsError('Incorrect password.');
    // jwt creation ---------------------
    const token = jwt.sign({ username: existingUser.username, _uid: existingUser.id }, process.env.SECRET, {
      expiresIn: '1h',
    });
    // #############################
    res.setHeader('authorization', 'Bearer ' + token);
    // #############################
    res.status(200).json({ message: 'User logged in!!.', username, token });
  } catch (error) {
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(404).json({ error });
  }
};

const getUsers = async (req, res) => {
  try {
    const players = await userRepository.retrieveAll();

    if (!players) return res.status(404).json({ message: 'No players found.' });
    return res.status(200).json({ players });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error getting players.', error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { newUsername } = req.body;
    if (Number(id) <= 0) {
      throw new NotCorrectParamsError('Incorrect parameter provided (id).');
    }
    const existingUser = await userRepository.retrieveById(id);
    if (!existingUser) throw new NotCorrectParamsError('No player found.');
    await userRepository.update(newUsername, id);
    return res
      .status(200)
      .json({ message: `Player -${existingUser.username}- was updated with new name: ${newUsername}` });
  } catch (error) {
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(500).json({ message: 'Error updating player.', error });
  }
};

module.exports = { loginUser, createUser, getUsers, updateUsers };
