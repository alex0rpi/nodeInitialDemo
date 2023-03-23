const { userRepository } = require('../../infrastructure/dependecy-injection');
const { gameRepository } = require('../../infrastructure/dependecy-injection');

module.exports = getHallOfFame = async (users, userGames) => {
  try {
    const users = await userRepository.retrieveAll(); // [{},{}]
    let dataArray = [];
    for (let user of users) {
      let winRatio = 0;
      const numberOfGames = await gameRepository.countUserGames(user.id);
      const numberOfWins = await gameRepository.countUserWins(user.id);
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
      .map((userObj) => {
        avgWinRatio += userObj.winRatio;
        return {
          ...userObj,
          winRatio: `${(userObj.winRatio * 100).toFixed(2)}%`,
        };
      });
    avgWinRatio = `${((avgWinRatio / dataArray.length) * 100).toFixed(2)}%`;
    return { resultRanking, avgWinRatio };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
