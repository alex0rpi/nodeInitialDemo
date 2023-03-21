const { getDb } = require('../../../helpers/createMongoDB');
const { ObjectId } = require('mongodb');

class MongoGameRepository {
  async playGame(dau1, dau2, guanya, id) {
    const newGame = {
      dau1,
      dau2,
      guanya,
    };
    const updatedGames = []
    let db = getDb();
    await db
      .collection('users_dice')
      .updateOne({ _id: new ObjectId(id) }, { $set: { games: newUsername } });
  }

  async retrieveOne(param) {
    let db = getDb();
    let existingUser;
    if (typeof param === 'number') {
      existingUser = await db.collection('users_dice').findOne({ _id: ObjectId(param) });
      return existingUser;
    }
    existingUser = await db.collection('users_dice').findOne({ username: param });
    return existingUser; // returns null if not found
  }

  async retrieveAll() {
    let db = getDb();
    let users = [];
    await db
      .collection('users_dice')
      .find({}, { pwd: 0 })
      .forEach((user) => users.push(user));
    // mongodb .find method returns a "cursor".
    // Then, the method .toArray puts the cursor object into an array
    // Can also use .sort, .forEach
    return users;
  }
}

module.exports = MongoGameRepository;
