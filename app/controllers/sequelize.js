const { Task } = require('../models/sequelize');
const { Op } = require('sequelize');
const { showUsers } = require('../helpers/showUsers.js');
const { showUserTasks } = require('../helpers/showUserTasks.js');
const { listDeletableTasks } = require('./../helpers/inquirer.js');

const seq_createTask = async (taskData) => {
  const { user, title, description } = taskData;
  try {
    await Task.create({
      user,
      title,
      description,
      status: 'pending',
    });
  } catch (error) {
    console.log(error);
    console.log({
      message: 'Something went wrong',
      data: {},
    });
  }
};

const seq_listTasks = async () => {
  try {
    const tasks = await Task.findAll();
    console.log();
    tasks.forEach((task, i) => {
      const index = `${i + 1}`.green;
      const started = !task.completedIn
        ? task.startedIn
          ? `- In progress`.yellow
          : '- Not started'.red
        : '';
      console.log(`${index} User: ${task.user.cyan} ${task.title} --> ${task.status} ${started}`);
    });
  } catch (error) {
    console.log(error);
    console.log({
      message: 'Something went wrong',
      data: {},
    });
  }
};

const seq_showUserTasks = async () => {
  const tasks = await Task.findAll();
  const userString = await showUsers(tasks);
  const userTasks = tasks.filter((element) => element.user === userString);
  return await showUserTasks(userTasks);
};

const seq_deletableTasks = async () => {
  const tasks = await Task.findAll();
  const id = listDeletableTasks(tasks);
  return id;
};

const seq_deleteTask = async (ids = []) => await Task.destroy({ where: { id: ids } });

const seq_startableTasks = async () => {
  const tasks = await Task.findAll({
    where: {
      // startedIn: null,
      status: 'pending',
    },
    raw: true,
  });
  return tasks;
};

const seq_markTaskStarted = async (selectedIds = []) => {
  try {
    const date = new Date().toISOString();
    const updated = await Task.update({ startedIn: date }, { where: { id: selectedIds } });
    if (updated === 0) console.log('No tasks marked as started');
    if (updated === 1) console.log('Task marked as started (in progress)');
    if (updated > 1) console.log('Tasks marked as started (in progress)');
    // Mark the rest of tasks as NULL at startedIn.
    await Task.update({ startedIn: null }, { where: { id: { [Op.notIn]: selectedIds } } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seq_createTask,
  seq_listTasks,
  seq_showUserTasks,
  seq_deletableTasks,
  seq_deleteTask,
  seq_startableTasks,
  seq_markTaskStarted,
};
