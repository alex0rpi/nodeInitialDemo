const { Task } = require("../models/sequelize");
const { showTask } = require("../helpers/showTask.js");
const seq_showTask = async (req, res) => {
  const tasks = await Task.findAll();
  showTask(tasks);
};

module.exports = { seq_showTask };
