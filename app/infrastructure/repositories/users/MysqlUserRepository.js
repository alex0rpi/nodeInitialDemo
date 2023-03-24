const { Users } = require('../../../models/initModels');

class MysqlUserRepository {
  async create(username, password) {
    await Users.create({ username, pwd: password });
  }

  async retrieveById(id) {
    let existingUser = await Users.findOne({ where: { id } }, { attributes: ['id', 'username'], raw: true });
    return existingUser;
  }

  async retrieveByName(name) {
    let existingUser = await Users.findOne({ where: { username: name } });
    return existingUser;
  }

  async retrieveAll() {
    const users = await Users.findAll({
      attributes: ['id', 'username'],
      raw: true,
    });
    return users;
  }

  async update(username, id) {
    await Users.update({ username }, { where: { id } });
    /* The sequelize.update() method in Node.js can return an integer value representing the number of rows affected by the update operation. */
  }
}

module.exports = MysqlUserRepository;
