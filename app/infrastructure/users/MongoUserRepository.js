class MongoUserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(username, password) {
    await db.collection('players').insertOne({ username, pwd: password });
  }

  async retrieve(username) {
    const existingUser = await this.model.findOne({ username });
    return existingUser;
  }

  async update(username) {}
}

module.exports = MongoUserRepository;
