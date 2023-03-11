const { Task } = require("../models/sequelize");
const { showUsers } = require("../helpers/showUsers.js");
const { showUserTasks } = require("../helpers/showUserTasks.js");

const seq_showUserTasks = async (req, res) => {
    const tasks = await Task.findAll();
    const userString = await showUsers(tasks);
    const userTasks = tasks.filter((element => element.user === userString))
    return await showUserTasks(userTasks)
  };

  module.exports = {seq_showUserTasks}