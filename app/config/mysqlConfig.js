const mysqlConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD || null,
  name: process.env.MYSQL_NAME || "4.2api_dice_game",
};

module.exports = { mysqlConfig };