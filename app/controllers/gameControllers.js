const { Partides } = require('../models');
const { Users } = require('../models');
const db = require('../models');

const userPlays = async (req, res) => {
  const playerId = req.params.id;
  // console.log(playerId);
  const existingUser = await Users.findOne({ where: { id: playerId } });
  if (!existingUser) return res.status(404).json({ message: 'No player found' });

  const dau1 = Math.floor(Math.random() * 6) + 1;
  const dau2 = Math.floor(Math.random() * 6) + 1;
  const guanya = dau1 + dau2 === 7 ? true : false;

  // console.log(dau1, dau2, guanya);
  const newGame = await Partides.create({ dau1, dau2, guanya, UserId: playerId });
  return res.status(200).json({ newGame, message: `Player -${existingUser.username}- has played one game.` });
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



module.exports = {
  userPlays,
  deleteUserGames,
  getUserGames,
};
