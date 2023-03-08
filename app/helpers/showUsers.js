const inquirer = require('inquirer')
const colors = require('colors');

const showUsers = async (tareas) => {
    let users = new Set(tareas.map(tarea => tarea.user));
    users = [...users]

    const choices = users.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea,
            name: `${idx} ${tarea}`
        };
    });
    const { user } = await inquirer.prompt({
        type: 'list',
        name: 'user',
        message: 'Select a user:',
        choices: choices
      });
    
      switch (choices.length) {
        case 0:
          console.log('No users found.');
          break;

        default:
          return user
      }
};

module.exports = { showUsers }