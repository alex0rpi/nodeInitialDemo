const getHallOfFame = require('../helpers/getHallOfFame');

// Aquesta solució ⬇ ⬇, que empra programació "imperativa", requereix de més queries a la base de dades, cosa que podria perjudicar el rendiment de la app.
const getRanking = async (req, res) => {
  try {
    let avgWinRatio = 0;
    const dataArray = await getHallOfFame();
    const resultRanking = dataArray
      .sort((a, b) => b.winRatio - a.winRatio)
      .map((player) => {
        avgWinRatio += player.winRatio;
        return {
          ...player,
          winRatio: `${(player.winRatio * 100).toFixed(2)}%`,
        };
      });
    avgWinRatio = `${((avgWinRatio / dataArray.length) * 100).toFixed(2)}%`;
    return res.status(202).json({ message: 'raking', avgWinRatio, resultRanking });
  } catch (error) {
    return res.status(500).json({ message: 'error', error:error.message });
  }
};

const getWorstPlayer = async (req, res) => {
  try {
    const dataArray = await getHallOfFame();
    const worstPlayer = dataArray.sort((a, b) => a.winRatio - b.winRatio)[0];
    res.status(200).json({
      message: 'Worst player',
      worstPlayer: { ...worstPlayer, winRatio: `${worstPlayer.winRatio.toFixed(2) * 100}%` },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error', error });
  }
};

const getBestPlayer = async (req, res) => {
  try {
    const dataArray = await getHallOfFame();
    const bestPlayer = dataArray.sort((a, b) => b.winRatio - a.winRatio)[0];
    res.status(200).json({
      message: 'Worst player',
      bestPlayer: { ...bestPlayer, winRatio: `${bestPlayer.winRatio.toFixed(2) * 100}%` },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error', error });
  }
};

module.exports = {
  getRanking,
  getWorstPlayer,
  getBestPlayer,
};

// Aquesta solució pel controlaor getRanking ⬇ ⬇, empra programació "declarativa", i només realitza una sola crida a la base de dades.
// Això, si, la querie queda bastant complexa i de fet no me n'he ensortit :/
// Possibilitat, ferho tot amb una fn.literal i posar tota la query en sql amb els JOIN i etc.

/* const getRanking2 = async (req, res) => {
    try {
      const userRaking = await Users.findAll(
        {
          include: {
            model: Games,
            attributes: [
              [
                db.sequelize.fn('COUNT', db.sequelize.literal(`CASE WHEN "wins" = true THEN 1 ELSE NULL END`)),
                'totalWins',
              ],
              [db.sequelize.fn('COUNT', db.sequelize.col('UserId')), 'totalGames'],
              [
                db.sequelize.fn(
                  'ROUND', db.sequelize.fn( 'COALESCE', db.sequelize.fn( 'CAST', // coalesce to avoid null values
                      db.sequelize.fn('COUNT', db.sequelize.literal(`CASE WHEN "wins" = true THEN 1 ELSE NULL END`)) /
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
