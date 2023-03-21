const { Games } = require('../../../models');
const { Users } = require('../../../models');

class MysqlGameRepository {
  async create(username, password) {
    await Users.create({ username, pwd: password });
  }

  async retrieveOne(param) {
    let existingUser;
    if (typeof +param === 'number') {
      existingUser = await Users.findOne({ where: { id: param } });
      return existingUser;
    }
    existingUser = await Users.findOne({ where: { username: param } });
    return existingUser;
  }
  async retrieveAll() {
    const users = await Users.findAll();
    return users;
  }

  async update(username, id) {
    await Users.update({ username }, { where: { id } });
    /* The sequelize.update() method in Node.js can return an integer value representing the number of rows affected by the update operation. */
  }
}

module.exports = MysqlGameRepository;
