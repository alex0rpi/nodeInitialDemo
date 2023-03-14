const { Partides } = require('../models');
const { Users } = require('../models');
const db = require('../models');

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

// Aquesta solució ⬇ ⬇, que empra programació "imperativa", requereix de més queries a la base de dades, cosa que podria perjudicar el rendiment de la app.
const getRanking = async (req, res) => {
  try {
    const users = await Users.findAll({ raw: true });
    let dataArray = [];
    // users.forEach(async (user) => { // for each seems it doesn't allow to await promises
    for (let user of users) {
      // for...of loop allows the await keyword to be used on the async functions within it.
      let winRatio = 0;
      numberOfGames = await Partides.count({ where: { UserId: user.id } });
      console.log(numberOfGames)
      numberOfWins = await Partides.count({ where: { UserId: user.id, guanya: true } });
      if (!(numberOfGames === 0)) winRatio = numberOfWins / numberOfGames;
      dataArray.push({
        player: user.username,
        winRatio,
        description: `${numberOfWins} wins out of ${numberOfGames} games played`,
      });
    }
    let avgWinRatio = 0;
    const resultRanking = dataArray
      .sort((a, b) => b.winRatio - a.winRatio)
      .map((player) => {
        avgWinRatio += player.winRatio;
        return {
          ...player,
          winRatio: `${(player.winRatio * 100).toFixed(2)}%`,
        };
      });
    avgWinRatio = `${((avgWinRatio / users.length) * 100).toFixed(2)}%`;
    return res.status(202).json({ message: 'raking', avgWinRatio, resultRanking });
  } catch (error) {
    return res.status(500).json({ message: 'error', error });
  }
};

// Aquesta solució ⬇ ⬇, empra programació "declarativa", i només realitza una sola crida a la base de dades.
// Això, si, la querie queda bastant complexa i de fet no me n'he ensortit :/

/* const getRanking2 = async (req, res) => {
  try {
    const userRaking = await Users.findAll(
      {
        include: {
          model: Partides,
          attributes: [
            [
              db.sequelize.fn('COUNT', db.sequelize.literal(`CASE WHEN "guanya" = true THEN 1 ELSE NULL END`)),
              'totalWins',
            ],
            [db.sequelize.fn('COUNT', db.sequelize.col('UserId')), 'totalGames'],
            [
              db.sequelize.fn(
                'ROUND', db.sequelize.fn( 'COALESCE', db.sequelize.fn( 'CAST', // coalesce to avoid null values
                    db.sequelize.fn('COUNT', db.sequelize.literal(`CASE WHEN "guanya" = true THEN 1 ELSE NULL END`)) /
                      db.sequelize.fn('NULLIF', db.sequelize.fn('COUNT', db.sequelize.col('UserId')), 0) // nullif to avoid division by zero
                  ) * 100,
                  0 // 0 if null
                ),
                2 //round to two decimals
              ),
              'winRatio',
            ],
          ],
          group: ['users.id'],
          order: [[db.sequelize.literal('winRatio DESC')]],
        },
      },
      {raw: true}
    );
    console.log(userRaking);
    return res.status(202).json({ message: 'raking', userRaking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error', error });
  }
}; */

// ----------------------------------------------------------------------------------

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