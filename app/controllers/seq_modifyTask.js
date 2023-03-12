const inquirer = require("inquirer")
const colors = require("colors")
const { Task } = require("../models/sequelize")
const {
  selectTask,
  selectModification,
  textoInput,
} = require("../helpers/modifyTask")

const seq_modifyTask = async () => {
  const tasks = await Task.findAll()
  const idTarea = await selectTask(tasks)
  const modificacion = await selectModification()
  if (modificacion != 0) {
    const newText = await textoInput()
    if (modificacion == 1) {
      await Task.update({ title: newText }, { where: { id: idTarea.id } })
    }
    if (modificacion == 2) {
      await Task.update({ description: newText }, { where: { id: idTarea.id } })
    }
    // list.modifyTask(idTarea, modificacion, newText)
    const final = await Task.findOne({ where: { id: idTarea.id } })
    console.log("Tarea modificada".green, final.dataValues)
  }
}

module.exports = { seq_modifyTask }
