const Sequelize = require('sequelize');
const { mysqlConfig } = require('../config/mysqlConfig');

const _Users = require('./Users');
const _Games = require('./Games');

const { designDB } = require('../db/createMysqlDB');

const sequelize = new Sequelize(mysqlConfig.name, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql',
  define: { freezeTableName: true },
  logging: false,
});

function initModels(sequelize) {
  const Users = _Users(sequelize, Sequelize.DataTypes);
  const Games = _Games(sequelize, Sequelize.DataTypes);
  Users.hasMany(Games, {foreignKey: "UserId"});
  return {
    Users,
    Games,
  };
}

const { Users, Games } = initModels(sequelize);

const initDB = async () => {
  try {
    await designDB();
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Mysql DB successfully connected.');
  } catch (error) {
    console.log(error.message);
    console.log('There was an error connecting with the database');
    process.exit(1);
  }
};

module.exports = { Users, Games, initDB };
