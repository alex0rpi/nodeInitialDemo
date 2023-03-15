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
      status: 'Pending',
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
      const status = task.status === 'Completed' ? task.status.green : task.status.yellow;
      const started = !task.completedIn ? (task.startedIn ? `- In progress`.yellow : '- Not started'.red) : '';
      console.log(`${index} User: ${task.user.cyan} ${task.title} --> ${status} ${started}`);
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

const seq_listTasksToStartOrComplete = async () => {
  try {
    const tasks = await Task.findAll({
      // where: {
      //   status: 'Pending',
      //   completedIn: null,
      // },
      raw: true,
    });
    return tasks;
  } catch (error) {
    throw new Error(error.message);
  }
};

const seq_markTaskStarted = async (selectedIds = []) => {
  try {
    const d = new Date();
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    const time = `${d.getHours()}:${d.getMinutes()}h`;
    selectedIds.forEach(async (id) => {
      const taskToMarkStarted = await Task.findOne({ where: { id } });
      // ONLY put a start date IF THE TASK IS NOT ALREADY STARTED.
      if (!taskToMarkStarted.startedIn) {
        await Task.update({ startedIn: `${date} at ${time}` }, { where: { id } });
        console.log('Task(s) marked as started');
      }
    });
    // Mark the rest of tasks as startedIn:Null and status:"Pending".
    await Task.update({ startedIn: null }, { where: { id: { [Op.notIn]: selectedIds } } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const seq_listPendingTasks = async () => {
  try {
    const tasks = await Task.findAll({
      where: { status: 'Pending' },
      raw: true,
    });
    let counter = 0;
    console.log(); // Go to next line
    tasks.forEach((taskItem) => {
      counter += 1;
      const { user, title, status, startedIn } = taskItem;
      const started = startedIn ? `Started: ${taskItem.startedIn}`.yellow : 'Not started'.red;
      console.log(`${(counter + '.').green} User: ${user.cyan} ${title} --> ${status.yellow} - ${started}`);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const seq_listCompletedTasks = async () => {
  try {
    const completedTasks = await Task.findAll({
      where: { status: 'Completed' },
      raw: true,
    });
    let counter = 0;
    console.log(); // Go to next line
    completedTasks.forEach((taskItem) => {
      const { user, title, completedIn, startedIn } = taskItem;
      counter += 1;
      const state = completedIn ? `Completed: ${taskItem.completedIn}`.green : 'Pending'.red;
      console.log(
        `${(counter + '.').green} User: ${user.cyan} - Task: ${title} --> ${
          startedIn ? 'Start: ' + taskItem.startedIn + ' - ' : ''
        }${state}`
      );
    });
  } catch (error) {}
};

const seq_markTaskCompleted = async (selectedIds = []) => {
  try {
    const d = new Date();
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    const time = `${d.getHours()}:${d.getMinutes()}h`;
    const updated = await Task.update(
      { completedIn: `${date} at ${time}`, status: 'Completed' },
      { where: { id: selectedIds } }
    );
    if (updated === 0) console.log('No tasks marked as completed');
    if (updated === 1) console.log('Task marked as completed');
    if (updated > 1) console.log('Tasks marked as completed');
    // Mark the rest of tasks as completedIn:Null and status:"Pending".
    await Task.update({ completedIn: null, status: 'Pending' }, { where: { id: { [Op.notIn]: selectedIds } } });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  seq_createTask,
  seq_listTasks,
  seq_showUserTasks,
  seq_deletableTasks,
  seq_deleteTask,
  seq_listTasksToStartOrComplete,
  seq_markTaskStarted,
  seq_listPendingTasks,
  seq_markTaskCompleted,
  seq_listCompletedTasks,
};
