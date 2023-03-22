class MongoGameRepository {
  async playGame(dice1, dice2, wins, id) {
    const existingUser = await db.collection('users_dice').findOne({ _id: new ObjectId(id) });
    existingUser.games.push({ dice1, dice2, wins });
    // console.log(existingGames);
    await 
      .updateOne({ _id: new ObjectId(id) }, { $set: { games: existingUser.games } });
  }

  async deleteUserGames(id) {
    await db.collection('users_dice').updateOne({ _id: new ObjectId(id) }, { $set: { games: [] } });
  }

  async cointUserGames(id) {
    numberOfGames = await Games.count({ where: { UserId: user.id } });
  }
  async cointUserWins(id) {
    numberOfWins = await Games.count({ where: { UserId: user.id, wins: true } });
  }
}

module.exports = MongoGameRepository;
