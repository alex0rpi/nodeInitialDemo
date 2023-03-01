import inquirer from "inquirer";
import "colors";

const listadoSeleccionarTarea = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " " + "Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: `Borrar`,
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const selecionarModificacion = async () => {
  const options = [
    {
      value: 1,
      name: "Title",
    },
    {
      value: 2,
      name: "Description",
    },
  ];

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: `What to modify?`,
      choices: options,
    },
  ];
  const { selection } = await inquirer.prompt(preguntas);
  console.log("selecionarModificacion:::", selection);
  return selection;
};

const textoInput = async (message) => {
  console.log("Insert new text");
  const question = [
    {
      type: "input",
      name: "newText",
      message: message,
    },
  ];

  const { newText } = await inquirer.prompt(question);
  console.log("textoInput:::", newText);
  return newText;
};

export { listadoSeleccionarTarea, selecionarModificacion, textoInput };
