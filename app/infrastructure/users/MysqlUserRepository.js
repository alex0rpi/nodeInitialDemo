class MysqlUserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(username, password) {
    await this.model.create({ username, pwd: password });
  }

  async retrieveOne(param) {
    let existingUser;
    if (typeof +param === 'number') {
      existingUser = await this.model.findOne({ where: { id: param } });
      return existingUser;
    }
    existingUser = await this.model.findOne({ where: { username: param } });
    return existingUser;
  }
  async retrieveAll() {
    const users = await this.model.findAll();
    return users;
  }

  async update(username, id) {
    await this.model.update({ username }, { where: { id } });
    /* The sequelize.update() method in Node.js can return an integer value representing the number of rows affected by the update operation. */
  }
}

module.exports = MysqlUserRepository;
