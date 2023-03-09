const { Partides } = require('../models');
const { Users } = require('../models');

const userPlays = async (req, res) => {
  const playerId = req.params.id;
  console.log(playerId);
  const existingUser = await Users.findOne({ where: { id: playerId } });
  if (!existingUser) return res.status(404).json({ message: 'No player found' });

  const dau1 = Math.floor(Math.random() * 6) + 1;
  const dau2 = Math.floor(Math.random() * 6) + 1;
  const guanya = dau1 + dau2 === 7 ? true : false;

  console.log(dau1, dau2, guanya);

  const newGame = await Partides.create({ dau1, dau2, guanya, UserId: playerId });
  return res.status(200).json({ newGame, message: 'new game created' });
};

const deleteUserGames = async (req, res) => {
  const playerId = req.params.id;
  const existingUser = await Users.findOne({ where: { id: playerId } });
  await Partides.destroy({ where: { UserId: playerId } });
  return res.status(200).json({ message: `All games for ${existingUser.username} were deleted` });
};

const getUserGames = async (req, res) => {
  const playerId = req.params.id;
  const existingUser = await Users.findOne({ where: { id: playerId } });
  if (!existingUser) return res.status(404).json({ message: 'No player found' });
  const userGames = await Partides.findAll(
    // { attributes: { exclude: ['UserId'] } },
    // { raw: true },
    { where: { UserId: existingUser.id } }
  );
  return res.status(200).json({ message: `Show games for ${existingUser.username}`, userGames });
};

const getRanking = async (req, res) => {
  const users = await Users.findAll({ raw: true });
  console.log(users)
  users.forEach(async (user) => {
    // console.log(user.id)
    numberOfWins = await Partides.count({ where: { UserId: user.id} });
    console.log(`Player ${user.username} has played ${} times`)
  });
  // console.log(playersArray);
  // const rankingArray = playersArray.map(async (player) => {
  //   const gamesWon = await Partides.count({ where: { UserId: player.id, guanya: 1 } });
  //   const totalPlayed = await Partides.count({ where: { UserId: player.id } });
  //   let playerWinPercentage = 0;
  //   if (!totalPlayed === 0) playerWinPercentage = (gamesWon / totalPlayed) * 100;

  //   console.log(playerWinPercentage);
  //   return {
  //     player: player.username,
  //     winPercentage: playerWinPercentage,
  //   };
  // });
  return res.status(202).json({ message: 'done' });
};

const getWorstPlayer = (req, res) => {};

const getBestPlayer = (req, res) => {};

module.exports = {
  userPlays,
  deleteUserGames,
  getUserGames,
  getRanking,
  getWorstPlayer,
  getBestPlayer,
};
