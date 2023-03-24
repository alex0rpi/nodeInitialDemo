const { Games } = require('../../../models/initModels');

class MysqlGameRepository {
  async playGame(dice1, dice2, wins, id) {
    const newGame = await Games.create({ dice1, dice2, wins, UserId: id });
    return newGame;
  }

  async deleteUserGames(id) {
    const hasGames = await Games.findAll({ where: { UserId: id } });
    if (hasGames) {
      await Games.destroy({ where: { UserId: id } });
    }
  }

  async retrieveUserGames(id) {
    const games = await Games.findAll(
      { where: { UserId: id } },
      { attributes: { exclude: ['UserId'] } },
      { raw: true }
    );
    // console.log(games);
    return games;
  }

  async countUserGames(id) {
    const numberOfGames = await Games.count({ where: { UserId: id } });
    return numberOfGames;
  }
  async countUserWins(id) {
    const numberOfWins = await Games.count({ where: { UserId: id, wins: true } });
    return numberOfWins;
  }
}

module.exports = MysqlGameRepository;