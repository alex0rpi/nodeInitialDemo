import "colors";

const showUserTasks = async tasks => {
     tasks.map((tarea, i) => {
        const index = `${i + 1}.`.green;
        const { user, title, completedIn } = tarea;
        const status = completedIn ? "Completed".green : "Pending".red;
        console.log(`${index} User:${user}. ${title} --> ${status}`)          
    });
}

export { showUserTasks };