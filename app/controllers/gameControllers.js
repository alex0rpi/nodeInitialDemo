const { Games } = require('../models');
const { Users } = require('../models');
const { userRepository } = require('../infrastructure/dependecy-injection');
const { gameRepository } = require('../infrastructure/dependecy-injection');

const userPlays = async (req, res) => {
  const id = req.params.id;
  const existingUser = await userRepository.retrieveById(id);
  if (!existingUser) return res.status(404).json({ message: 'No player found' });

  const dau1 = Math.floor(Math.random() * 6) + 1;
  const dau2 = Math.floor(Math.random() * 6) + 1;
  const guanya = dau1 + dau2 === 7 ? true : false;

  const newGame = await gameRepository.playGame(dau1, dau2, guanya, id);
  return res.status(200).json({ newGame, message: `Player -${existingUser.username}- has played one game.` });
};

const deleteUserGames = async (req, res) => {
  const playerId = req.params.id;
  const existingUser = await Users.findOne({ where: { id: playerId } });
  await Games.destroy({ where: { UserId: playerId } });
  return res.status(200).json({ message: `All games for ${existingUser.username} were deleted` });
};

const getUserGames = async (req, res) => {
  const playerId = req.params.id;
  const existingUser = await Users.findOne({ where: { id: playerId } });
  if (!existingUser) return res.status(404).json({ message: 'No player found' });
  const userGames = await Games.findAll(
    // { attributes: { exclude: ['UserId'] } },
    // { raw: true },
    { where: { UserId: existingUser.id } }
  );
  return res.status(200).json({ message: `Show games for ${existingUser.username}`, userGames });
};

module.exports = {
  userPlays,
  deleteUserGames,
  getUserGames,
};
