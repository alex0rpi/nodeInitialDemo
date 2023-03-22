const { Games } = require('../../../models');

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
    return games;
  }

  async cointUserGames(id) {
    numberOfGames = await Games.count({ where: { UserId: user.id } });
  }
  async cointUserWins(id) {
    numberOfWins = await Games.count({ where: { UserId: user.id, wins: true } });
  }
}

module.exports = MysqlGameRepository;
