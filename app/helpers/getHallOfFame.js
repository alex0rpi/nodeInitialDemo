const { userRepository } = require('../infrastructure/dependecy-injection');
const { gameRepository } = require('../infrastructure/dependecy-injection');

module.exports = getHallOfFame = async () => {
  try {
    const users = await userRepository.retrieveAll(); // [{},{}]
    let dataArray = [];
    for (let user of users) {
      let winRatio = 0;
      // numberOfGames = await Games.count({ where: { UserId: user.id } });
      const numberOfGames = await gameRepository.countUserGames(user.id);
      // numberOfWins = await Games.count({ where: { UserId: user.id, wins: true } });
      const numberOfWins = await gameRepository.cointUserWins(user.id);
      if (!(numberOfGames === 0)) winRatio = numberOfWins / numberOfGames;
      dataArray.push({
        player: user.username,
        winRatio,
        description: `${numberOfWins} wins out of ${numberOfGames} games played`,
      });
    }
    return dataArray;
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
};
