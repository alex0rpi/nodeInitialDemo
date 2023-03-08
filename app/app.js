const {
  inquirerMenu,
  pause,
  readInput,
  listDeletableTasks,
  confirm,
  checklistStartableTasks,
  checklistCompletableTasks,
  registerUser,
} = require('./helpers/inquirer.js');
const { showTask } = require('./helpers/showTask.js');
const { selectTask, selectModification, textoInput } = require('./helpers/modifyTask.js');
const { showUsers } = require('./helpers/showUsers.js');
const { showUserTasks } = require('./helpers/showUserTasks.js');
const { saveInfo, readInfo } = require('./helpers/modifyDB.js');
const { List } = require('./models/List');
const { seq_createTask } = require('./controllers/sequelize');
require('dotenv').config();

const main = async () => {
  let opt = ''; // currently selected option
  const list = new List();

  const tasksDB = readInfo(); // [{},{}]
  if (tasksDB) {
    // Load tasks (como un useEffect)
    list.loadTaskArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();
    // ----------------------------------------------------
    switch (opt) {
      case '1':
        const userName = await registerUser('User: ');
        console.log(userName);
        const inputTitle = await readInput('Title: ');
        console.log(inputTitle);
        const inputDesc = await readInput('Description: ');
        if (process.env.DATABASE === 'json') list.createTask(userName, inputTitle, inputDesc);
        if (process.env.DATABASE === 'mysql') seq_createTask({user:userName, title:inputTitle, description:inputDesc})
        
        break;
      case '2':
        // console.log(list.listArray); // a un getter o setter se accede como a cualquier propiedad.
        list.listAllTasks();
        break;
      case '3': // list completed
        list.listPendingInProgressCompleted(true);
        break;
      case '4': // list pending (including started)
        list.listPendingInProgressCompleted(false);
        break;
      case '5': // mark as started(in progress)
        const taskIds = await checklistStartableTasks(list.listArray);
        list.markTaskStarted(taskIds);
        break;
      case '6': // mark as complete
        const ids = await checklistCompletableTasks(list.listArray);
        list.markTaskComplete(ids);
        break;
      case '7': // delete
        const id = await listDeletableTasks(list.listArray);
        if (id[0] === 0 || id[0] === undefined) break;

        // Ask "are you sure?"
        const ok = await confirm('Are you sure?');
        if (ok) {
          list.deleteTask(id);
          console.log('Task was deleted');
        } else {
          break;
        }
        break;
      case '8': // mostrar taska específica
        await showTask(list.listArray); //seleccionamos task
        break;
      case '9': // mostrar users
        const user = await showUsers(list.listArray);
        await showUserTasks(list.filterUserTask(user));
        break;
      case '10': // modify task
        const idTarea = await selectTask(list.listArray);
        const modificacion = await selectModification();
        if (modificacion != 0) {
          const newText = await textoInput();
          list.modifyTask(idTarea, modificacion, newText);
        }

      case '0':
        break;
    }
    // ----------------------------------------------------
    saveInfo(list.listArray);
    await pause();
  } while (opt !== '0');
};
main();
