const { getDb } = require('../../helpers/createMongoDB');

class MongoUserRepository {
  constructor() {
    this.model = getDb();
  }

  async create(username, password) {
    await this.model
      .collection('users_dice')
      .insertOne({ username, password, games: [], avgWinRatio: null });
  }

  async retrieveOne(param) {
    let existingUser;
    if (typeof +param === 'number') {
      existingUser = await this.model.collection('users_dice').findOne({ _id: ObjectId(param) });
      return existingUser;
    }
    existingUser = await this.model.collection('users_dice').findOne({ username: param });
    return existingUser;
  }

  async retrieveAll() {
    const users = await this.model.collection('users_dice').find();
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
