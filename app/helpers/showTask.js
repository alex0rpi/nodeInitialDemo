const inquirer = require('inquirer')
const colors = require('colors');

const showTask = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea,
      name: `${idx} ${tarea.title}`,
    };
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: `Choose to select`,
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  console.log(
    `User:${id.user.green} Title: ${id.title.green} Description: ${
      id.description.green
    }, status: ${id.completedIn ? `completed`.green : `incomplet`.red} `
  );
  return id;
};

module.exports = { showTask };
