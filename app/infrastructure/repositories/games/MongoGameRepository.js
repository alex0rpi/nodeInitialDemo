const { getDb } = require('../../../db/createMongoDB');
const { ObjectId } = require('mongodb');

class MongoGameRepository {
  async playGame(dice1, dice2, wins, id) {
    let db = getDb();
    const existingUser = await db.collection('users_dice').findOne({ _id: new ObjectId(id) });
    existingUser.games.push({ dice1, dice2, wins });
    // console.log(existingGames);
    await db
      .collection('users_dice')
      .updateOne({ _id: new ObjectId(id) }, { $set: { games: existingUser.games } });
  }

  async deleteUserGames(id) {
    let db = getDb();
    await db.collection('users_dice').updateOne({ _id: new ObjectId(id) }, { $set: { games: [] } });
  }

  async cointUserGames(id) {
    console.log(id)
    const userId = +id.toString()
    console.log(userId)
    let db = getDb();
    const existingUser = await db.collection('users_dice').findOne({ _id: userId });
    return existingUser.games.toArray().length;
  }
  async cointUserWins(id) {
    let db = getDb();
    const existingUser = await db.collection('users_dice').findOne({ _id: new ObjectId(id) });
    let wins = 0;
    existingUser.games.forEach((game) => {
      if (game.wins) wins++;
    });
    return wins;
  }
}

module.exports = MongoGameRepository;
