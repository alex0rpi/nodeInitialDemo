const { userRepository } = require('../infrastructure/dependecy-injection');
const { gameRepository } = require('../infrastructure/dependecy-injection');
const createGame = require('../domain/services/playGame');
const NotCorrectParamsError = require('./exceptions/ErrorHandler');

const userPlays = async (req, res) => {
  try {
    const id = req.params.id;
    const existingUser = await userRepository.retrieveById(id);
    if (!existingUser) throw new NotCorrectParamsError('No player found');
    const { dice1, dice2, wins } = createGame();
    await gameRepository.playGame(dice1, dice2, wins, id);
    const newGame = { dice1, dice2, wins };
    return res
      .status(200)
      .json({ message: `Player -${existingUser.username}- has played one game.`, newGame });
  } catch (error) {
    // console.log(error);
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(500).json({ message: 'Error playing game.', error });
  }
};

const deleteUserGames = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await userRepository.retrieveById(userId);
    if (!existingUser) throw new NotCorrectParamsError('No player found');
    await gameRepository.deleteUserGames(userId);
    // await Games.destroy({ where: { UserId: playerId } });
    return res.status(200).json({ message: `All games for ${existingUser.username} were deleted` });
  } catch (error) {
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(500).json({ message: 'Error playing game.', error });
  }
};

const getUserGames = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await userRepository.retrieveById(userId);
    if (!existingUser) throw new NotCorrectParamsError('No player found');
    const userGames = await gameRepository.retrieveUserGames(userId);
    if (userGames.length === 0)
      return res.status(404).json({ user: existingUser.username, message: 'No games found for this user' });
    return res.status(200).json({ message: `Show games for ${existingUser.username}`, userGames });
  } catch (error) {
    if (error instanceof NotCorrectParamsError) return res.status(401).json({ message: error.message });
    return res.status(500).json({ message: 'Error playing game.', error });
  }
};

module.exports = {
  userPlays,
  deleteUserGames,
  getUserGames,
};
