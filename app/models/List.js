/*
 _taskList:
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:"1232134" } },
*/

const { Task } = require('./Task.js');
const colors = require('colors');

class List {
  _taskList = {};

  constructor() {
    this._taskList = {};
  }

  get listArray() {
    let arrayList = [];
    Object.keys(this._taskList).forEach((key) => {
      // Enchufamos el contenido de la posición [key], que es toda la tarea
      const taskItem = this._taskList[key];
      arrayList.push(taskItem);
    });
    return arrayList;
  }

  modifyTask(idTarea, modification, newText) {
    let idx = idTarea.id;
    if (modification === 1) {
      // modify title
      this._taskList[idx] = {
        ...this._taskList[idx],
        title: newText,
      };
    } else if (modification === 2) {
      //modify description
      this._taskList[idx] = {
        ...this._taskList[idx],
        description: newText,
      };
    }
  }

  deleteTask(ids = []) {
    ids.forEach((id) => {
      if (this._taskList[id]) {
        delete this._taskList[id];
      }
    })
  }

  loadTaskArray(tasks = []) {
    tasks.forEach((item) => {
      this._taskList[item.id] = item;
    });
  }

  createTask(name, title = '', desc = '') {
    const task = new Task(name, title, desc);
    this._taskList[task.id] = task;
  }

  listAllTasks() {
    console.log();
    this.listArray.forEach((tarea, i) => {
      const index = `${i + 1}`.green;

      const { user, title, startedIn, completedIn } = tarea;
      const status = completedIn ? 'Completed'.green : 'Pending'.red;
      const started = !completedIn ? (startedIn ? `- In progress`.yellow : '- Not started'.red) : '';
      console.log(`${index} User: ${user.cyan} ${title} --> ${status} ${started}`);
    });
  }

  listPendingInProgressCompleted(completed = true) {
    let counter = 0;
    console.log();
    this.listArray.forEach((taskItem) => {
      const { user, title, startedIn, completedIn } = taskItem;

      const status = completedIn ? `Completed: ${taskItem.completedIn}`.green : 'Pending'.red;
      const started = startedIn ? `Started: ${taskItem.startedIn}`.yellow : 'Not started'.red;
      if (completed) {
        if (completedIn) {
          // show completed
          counter += 1;
          console.log(`${(counter + '.').green} User: ${user.cyan} ${title} --> ${status}`);
        }
      } else {
        if (!completedIn) {
          // show pending (in progress and not started)
          counter += 1;
          console.log(
            `${(counter + '.').green} User: ${user.cyan} ${title} --> ${status} - ${started}`
          );
        }
      }
    });
  }

  markTaskStarted(ids = []) {
    ids.forEach((id) => {
      if (!id) return
      if (!this._taskList[id].startedIn) {
        this._taskList[id].startedIn = new Date().toLocaleString();
      }
    });
    // Need to mark everything else as PENDING if not marked as started.
    this.listArray.forEach((taskItem) => {
      if (!ids.includes(taskItem.id)) {
        this._taskList[taskItem.id].startedIn = null;
      }
    });
  }

  markTaskComplete(ids = []) {
    ids.forEach((id) => {
      if (!id) return
      if (!this._taskList[id].completedIn) {
        this._taskList[id].completedIn = new Date().toLocaleString();
        this._taskList[id].startedIn = null;
      }
    });
    // make sure every task NOT MARKED as complete is set to PENDING
    this.listArray.forEach((taskItem) => {
      if (!ids.includes(taskItem.id)) {
        this._taskList[taskItem.id].completedIn = null;
      }
    });
  }

  filterUserTask(userName) {
    return this.listArray.filter((element) => element?.user === userName);
  }
}
module.exports = { List };
