const inquirer = require("inquirer")
const colors = require("colors")

const selectTask = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: tarea,
      name: `${idx} ${tarea.title}`,
    }
  })

  choices.push({
    value: "0",
    name: "0.".green + " " + "Cancelar",
  })
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: `Borrar`,
      choices: choices,
    },
  ]
  const { id } = await inquirer.prompt(preguntas)
  return id
}

const selectModification = async () => {
  const options = [
    {
      value: 1,
      name: "Title",
    },
    {
      value: 2,
      name: "Description",
    },
  ]
  options.push({
    value: "0",
    name: "Cancelar",
  })

  const preguntas = [
    {
      type: "list",
      name: "selection",
      message: `What to modify?`,
      choices: options,
    },
  ]
  const { selection } = await inquirer.prompt(preguntas)
  return selection
}

const textoInput = async (message) => {
  console.log("Insert new text")
  const question = [
    {
      type: "input",
      name: "newText",
      message: message,
    },
  ]

  const { newText } = await inquirer.prompt(question)
  return newText
}

module.exports = { selectTask, selectModification, textoInput }
