const { Users } = require('../../models');
const { Partides } = require('../../models');

module.exports = getHallOfFame = async () => {
  try {
    const users = await Users.findAll({ raw: true });
    let dataArray = [];
    for (let user of users) {
      let winRatio = 0;
      numberOfGames = await Partides.count({ where: { UserId: user.id } });
      numberOfWins = await Partides.count({ where: { UserId: user.id, guanya: true } });
      if (!(numberOfGames === 0)) winRatio = numberOfWins / numberOfGames;
      dataArray.push({
        player: user.username,
        winRatio,
        description: `${numberOfWins} wins out of ${numberOfGames} games played`,
      });
    }
    return dataArray;
  } catch (error) {
    throw new Error(error.message);
  }
};
