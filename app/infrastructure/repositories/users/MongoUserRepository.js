const { getDb } = require('../../../helpers/createMongoDB');
const { ObjectId } = require('mongodb');

class MongoUserRepository {
  async create(username, password) {
    let db = getDb();
    await db.collection('users_dice').insertOne({ username, pwd: password, games: [], avgWinRatio: null });
  }

  async retrieveById(id) {
    let db = getDb();
    let existingUser = await db.collection('users_dice').findOne({ _id: new ObjectId(id) }, { _id: 0 });
    // console.log(existingUser)
    return existingUser;
  }

  async retrieveByName(name) {
    let db = getDb();
    let existingUser = await db.collection('users_dice').findOne({ username: name });
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

  async update(newUsername, id) {
    let db = getDb();
    let result = await db
      .collection('users_dice')
      .updateOne({ _id: new ObjectId(id) }, { $set: { username: newUsername } });
    console.log(result);
  }
}

module.exports = MongoUserRepository;