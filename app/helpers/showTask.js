import inquirer from "inquirer";
import "colors";

const showTask = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea,
      name: `${idx} ${tarea.description}`,
    };
  });
  //   console.log(choices);

  choices.unshift({
    value: "0",
    name: "0.".green + " " + "Cancelar",
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
    `Task: ${id.description.green}, status: ${
      id.completedIn ? `completed`.green : `incomplet`.red
    } `
  );
};

export { showTask };
