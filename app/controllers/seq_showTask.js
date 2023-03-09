const { Task } = require("../models/sequelize");
const { showTask } = require("../helpers/showTask.js");
const seq_showTask = async (req, res) => {
  const tasks = await Task.findAll();
  //   console.log(tasks[0].user);
  const task = await showTask(tasks);
  //   console.log(task);
};

module.exports = { seq_showTask };
