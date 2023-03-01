import "colors";
import {
  inquirerMenu,
  pause,
  readInput,
  listDeletableTasks,
  confirm,
  checklistCompletableTasks,
} from "./helpers/inquirer.js";
import {
  // imports para modificar tarea
  listadoSeleccionarTarea,
  selecionarModificacion,
  textoInput,
} from "./helpers/inquirerModificarTarea";
import { List } from "./models/List.js";
import { saveInfo, readInfo } from "./helpers/modifyDB.js";

const main = async () => {
  let opt = ""; // currently selected option
  const list = new List(); // new instance of task list (should be unique, singleton pattern?)

  const tasksDB = readInfo(); // [{},{}]
  if (tasksDB) {
    // Load tasks (como un useEffect)
    list.loadTaskArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();
    // ----------------------------------------------------
    switch (opt) {
      case "1":
        const inputText = await readInput("Description: ");
        console.log(inputText);
        list.createTask(inputText);
        break;
      case "2":
        // console.log(list.listArray); // a un getter o setter se accede como a cualquier propiedad.
        list.listAllTasks();
        break;
      case "3": // list completed
        list.listPendingCompleted(true);
        break;
      case "4": // list pending
        list.listPendingCompleted(false);
        break;
      case "5": // mark as complete
        const ids = await checklistCompletableTasks(list.listArray);
        list.markTaskComplete(ids);
        break;
      case "6": // delete
        const id = await listDeletableTasks(list.listArray);
        if (!id === 0) {
          // Ask "are you sure?"
          const ok = await confirm("Are you sure?");
          if (ok) {
            list.deleteTask(id);
            console.log("Task was deleted");
          }
        }
        break;
      case "7": // modify task -- por ahora newText y modificacion devuelven udefined
        const idTarea = await listadoSeleccionarTarea(tareas.listadorArr); // seleccion amos tarea por id
        const modificacion = await selecionarModificacion(); // selecceionamos qu queremos modificar
        const newText = await textoInput(); // nuevo texto a introducir
        List.modificarTarea(idTarea, modificacion, newText);
      case "0":
        break;
    }
    // ----------------------------------------------------
    saveInfo(list.listArray);
    await pause();
  } while (opt !== "0");
};
main();
