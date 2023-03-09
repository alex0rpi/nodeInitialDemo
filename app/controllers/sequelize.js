const { Task } = require('../models/sequelize');

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

module.exports = { seq_createTask, seq_listTasks };
