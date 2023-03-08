const { Task } = require('../models/sequelize');

const seq_createTask = async (taskData) => {
  const { user, title, description } = taskData;
  try {
    await Task.create(
      {
        user,
        title,
        description,
        status: 'pending',
      },
    );
  } catch (error) {
    console.log(error);
    console.log({
      message: 'Something went wrong',
      data: {},
    });
  }
};

const seq_showAllTasks = async () => {
  try {
    const tasks = await Task.findAll();
    console.log({
      message: 'All tasks',
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    console.log({
      message: 'Something went wrong',
      data: {},
    });
  }
};

module.exports = { seq_createTask, seq_showAllTasks };
