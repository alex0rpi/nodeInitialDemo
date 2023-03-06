import inquirer from "inquirer";
import "colors";
import { List } from "./../models/List.js";

const showUserTasks = async tasks => {
    const choices = tasks.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea,
            name: `${idx} ${tarea.description}`
        };
    });
    const { task } = await inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'Select a task:',
        choices: choices
      });
    
      switch (choices.length) {
        case 0:
          console.log('No tasks found.');
          break;

        default:
          return console.log('well done')
      }
}

export { showUserTasks };