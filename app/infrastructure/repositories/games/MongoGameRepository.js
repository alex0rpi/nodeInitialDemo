const { getDb } = require('../../../helpers/createMongoDB');

class MongoUserRepository {
  async create(username, password) {
    let db = getDb();
    await db.collection('users_dice').insertOne({ username, pwd: password, games: [], avgWinRatio: null });
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

  async update(username, id) {
    await db.update();
  }
}

module.exports = MongoUserRepository;
