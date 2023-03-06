/*
 _taskList:
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:"1232134" } },
*/

import { Task } from "./Task.js";
import "colors";

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

  deleteTask(id = "") {
    if (this._taskList[id]) {
      delete this._taskList[id];
    }
  }

  loadTaskArray(tasks = []) {
    tasks.forEach((item) => {
      this._taskList[item.id] = item;
    });
  }

  createTask(name, title = "", desc = "") {
    const task = new Task(name, title, desc);

    this._taskList[task.id] = task;
  }

  listAllTasks() {
    console.log();
    this.listArray.forEach((tarea, i) => {
      const index = `${i + 1}`.green;

      const { user, title, completedIn } = tarea;
      const status = completedIn ? "Completed".green : "Pending".red;
      console.log(`${index} User:${user}. ${title} --> ${status}`);
    });
  }

  listPendingCompleted(completed = true) {
    let counter = 0;
    console.log();
    this.listArray.forEach((taskItem) => {
      const { user, title, completedIn } = taskItem;

      const status = completedIn
        ? `Completed: ${taskItem.completedIn}`.green
        : "Pending".red;
      if (completed) {
        if (completedIn) {
          // show completed
          counter += 1;

          console.log(
            `${(counter + ".").green} User:${user}. ${title} --> ${status}`
          );
        }
      } else {
        if (!completedIn) {
          // show pending
          counter += 1;

          console.log(
            `${(counter + ".").green} User:${user}. ${title} --> ${status}`
          );
        }
      }
    });
  }

  markTaskComplete(ids = []) {
    ids.forEach((id) => {
      if (!this._taskList[id].completedIn) {
        this._taskList[id].completedIn = new Date().toLocaleString();
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
export { List };
