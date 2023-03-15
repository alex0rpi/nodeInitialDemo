const {
  inquirerMenu,
  pause,
  readInput,
  listDeletableTasks,
  confirm,
  listStartableTasks,
  checklistCompletableTasks,
  registerUser,
} = require('./helpers/inquirer.js');
const { showTask } = require('./helpers/showTask.js');
const { selectTask, selectModification, textoInput } = require('./helpers/modifyTask.js');
const { showUsers } = require('./helpers/showUsers.js');
const { showUserTasks } = require('./helpers/showUserTasks.js');
const { saveInfo, readInfo } = require('./helpers/modifyDB.js');
const { List } = require('./models/json/List');
const {
  seq_createTask,
  seq_listTasks,
  seq_showUserTasks,
  seq_deleteTask,
  seq_deletableTasks,
  seq_listTasksToStartOrComplete,
  seq_markTaskStarted,
  seq_listPendingTasks,
  seq_markTaskCompleted,
  seq_listCompletedTasks,
} = require('./controllers/sequelize');
const { Task } = require('./models/sequelize');
const { seq_modifyTask } = require('./controllers/seq_modifyTask.js');

require('dotenv').config();

const main = async () => {
  let opt = ""; // currently selected option

  const list = process.env.DATABASE === "json" ? new List() : null;

  const tasksDB = process.env.DATABASE === "json" ? readInfo() : null;
  list?.loadTaskArray(tasksDB ?? []);

  do {
    opt = await inquirerMenu();
    // ----------------------------------------------------
    switch (opt) {
      case "1":
        const userName = await registerUser("User: ");
        console.log(userName);
        const inputTitle = await readInput("Title: ");
        console.log(inputTitle);
        const inputDesc = await readInput("Description: ");
        if (process.env.DATABASE === "json"){
          list.createTask(userName, inputTitle, inputDesc);
        }
        if (process.env.DATABASE === "mysql") {
          seq_createTask({
            user: userName,
            title: inputTitle,
            description: inputDesc,
          });
        }

        break;
      case "2":
        if (process.env.DATABASE === "json") list.listAllTasks();
        if (process.env.DATABASE === "mysql") seq_listTasks();

        break;
        case '3': // list completed
        if (process.env.DATABASE === 'json') list.listPendingInProgressCompleted(true);
        if (process.env.DATABASE === 'mysql') seq_listCompletedTasks();
        break;
      case '4': // list pending (including started)
        if (process.env.DATABASE === 'json') {
          list.listPendingInProgressCompleted(false);
        }
        if (process.env.DATABASE === 'mysql') {
          seq_listPendingTasks();
        }
        break;
        case '5': // mark tasks as started
        if (process.env.DATABASE === 'json') {
          const taskIds = await listStartableTasks(list.listArray);
          list.markTaskStarted(taskIds);
        }
        if (process.env.DATABASE === 'mysql') {
          // Check mysql database and send info to inquirer function
          const tasksToList = await seq_listTasksToStartOrComplete();
          // Send list to inquirer to prompt and let user select those wanted
          const tasksIdsMarkStarted = await listStartableTasks(tasksToList);
          // Pass the selection to sequelize function to update database
          seq_markTaskStarted(tasksIdsMarkStarted);
        }
        break;
      case '6': // mark as complete
        if (process.env.DATABASE === 'json') {
          const ids = await checklistCompletableTasks(list.listArray);
          list.markTaskComplete(ids);
        }
        if (process.env.DATABASE === 'mysql') {
          const tasksToList = await seq_listTasksToStartOrComplete();
          const tasksIdsMarkCompleted = await checklistCompletableTasks(tasksToList);
          seq_markTaskCompleted(tasksIdsMarkCompleted);
        }
        break;
        case '7': // delete
        console.log(process.env.DATABASE);
        if (process.env.DATABASE === 'json') {
          const id = await listDeletableTasks(list.listArray);
          if (id[0] === 0 || id[0] === undefined) break;
          const ok = await confirm('Are you sure?');
          if (ok) {
            list.deleteTask(id);
            console.log('Task was deleted');
          } else {
            break;
          }
        }
        if (process.env.DATABASE === 'mysql') {
          const id = await seq_deletableTasks();
          if (id[0] === 0 || id[0] === undefined) break;
          const ok = await confirm('Are you sure?');
          if (ok) {
            await seq_deleteTask(id);
            console.log('Task was deleted');
          } else {
            break;
          }
        }
        

        // Ask "are you sure?"
        break;
      case '8': // mostrar taska específica
        if (process.env.DATABASE === 'json') await showTask(list.listArray);
        if (process.env.DATABASE === 'mysql') {
          const tasks = await Task.findAll();
          await showTask(tasks);
        }
        break;
      case '9': // mostrar users
        if (process.env.DATABASE === 'json') {
          const user = await showUsers(list.listArray);
          await showUserTasks(list.filterUserTask(user));
        }
        if (process.env.DATABASE === 'mysql') await seq_showUserTasks();
        break;
      case '10': // modify task
        if (process.env.DATABASE === 'json') {
          const idTarea = await selectTask(list.listArray);
          const modificacion = await selectModification();
          if (modificacion != 0) {
            const newText = await textoInput();
            list.modifyTask(idTarea, modificacion, newText);
          }
        }
        if (process.env.DATABASE === 'mysql') {
          await seq_modifyTask();
        }
      case '0':
        break;
    }
    // ----------------------------------------------------
    if(list) saveInfo(list.listArray);
    await pause();
  } while (opt !== '0');
};
main();