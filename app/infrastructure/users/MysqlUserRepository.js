class MysqlUserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(username, password) {
    await this.model.create({ username, pwd: password });
  }

  async retrieve(username) {
    const existingUser = await this.model.findOne({ where: { username } });
    return existingUser;
  }

  async update(username) {}
}

module.exports = MysqlUserRepository