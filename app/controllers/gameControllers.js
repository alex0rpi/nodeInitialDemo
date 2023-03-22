const { userRepository } = require('../infrastructure/dependecy-injection');
const { gameRepository } = require('../infrastructure/dependecy-injection');

const userPlays = async (req, res) => {
  try {
    const id = req.params.id;
    const existingUser = await userRepository.retrieveById(id);
    if (!existingUser) return res.status(404).json({ message: 'No player found' });
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const wins = dice1 + dice2 === 7 ? true : false;
    await gameRepository.playGame(dice1, dice2, wins, id);
    const newGame = { dice1, dice2, wins };
    return res
      .status(200)
      .json({ message: `Player -${existingUser.username}- has played one game.`, newGame });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error playing game.', error });
  }
};

const deleteUserGames = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await userRepository.retrieveById(userId);
  await gameRepository.deleteUserGames(userId);
  // await Games.destroy({ where: { UserId: playerId } });
  return res.status(200).json({ message: `All games for ${existingUser.username} were deleted` });
};

const getUserGames = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await userRepository.retrieveById(userId);

  if (!existingUser) return res.status(404).json({ message: 'No player found' });
  const userGames = existingUser.games;
  // await Games.findAll(
  // { attributes: { exclude: ['UserId'] } },
  // { raw: true },
  // { where: { UserId: existingUser.id } }

  return res.status(200).json({ message: `Show games for ${existingUser.username}`, userGames });
};

module.exports = {
  userPlays,
  deleteUserGames,
  getUserGames,
};
