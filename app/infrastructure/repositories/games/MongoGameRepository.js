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

  async retrieveUserGames(id) {
    let db = getDb();
    const existingUser = await db.collection('users_dice').findOne({ _id: new ObjectId(id) });
    return existingUser.games;
  }

  async countUserGames(id) {
    let db = getDb();
    const result = await db
      .collection('users_dice')
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $project: { numGamesPlayed: { $size: '$games' } } },
      ])
      .toArray();
    return result[0].numGamesPlayed;
  }
  async countUserWins(id) {
    let db = getDb();
    const result = await db
      .collection('users_dice')
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $project: {
            numWins: {
              $size: { $filter: { input: '$games', as: 'game', cond: { $eq: ['$$game.wins', true] } } },
            },
          },
        },
      ])
      .toArray();
    return result[0].numWins;
  }
}

module.exports = MongoGameRepository;
