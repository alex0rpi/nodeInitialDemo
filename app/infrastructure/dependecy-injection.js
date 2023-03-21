const MongoUserRepository = require('./repositories/users/MongoUserRepository');
const MysqlUserRepository = require('./repositories/users/MysqlUserRepository');
const MongoGameRepository = require('./repositories/users/MongoUserRepository');
const MysqlGameRepository = require('./repositories/users/MysqlUserRepository');

function configUserRepository() {
  if (process.env.DB === 'mongodb') return new MongoUserRepository();
  if (process.env.DB === 'mysql') return new MysqlUserRepository();
}

function configGameRepository() {
  if (process.env.DB === 'mongodb') return new MongoGameRepository();
  if (process.env.DB === 'mysql') return new MysqlGameRepository();
}

const userRepository = configUserRepository();
const gameRepository = configGameRepository();

module.exports = { userRepository, gameRepository };
