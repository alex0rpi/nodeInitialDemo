import inquirer from 'inquirer';
import 'colors';

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [

      { value: "1", name: `${"1.".yellow} Create task` },
      { value: "2", name: `${"2.".yellow} List all tasks` },
      { value: "3", name: `${"3.".yellow} List completed tasks` },
      { value: "4", name: `${"4.".yellow} List pending tasks` },
      { value: "5", name: `${"5.".yellow} Mark task(s) complete` },
      { value: "6", name: `${"6.".yellow} Delete task` },
      { value: "7", name: `${"7.".yellow} Select specific task` },
      { value: "8", name: `${"8.".yellow} Select tasks by user` },
      { value: "0", name: `${"0.".yellow} Exit` },

    ],
  },
];

// Menu principal -------------------------------------------------------------------
const inquirerMenu = async () => {
  //   console.clear();
  console.log('======================='.yellow);
  console.log('   Select an option   '.green);
  console.log('=======================\n'.yellow);

  // tiene que coincidir el nombre de la const con el "name" en la question (option)
  const { option } = await inquirer.prompt(questions);

  return option;
};
// ----------------------------------------------------------------------------------
const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Please ${'ENTER'.red} to continue`,
    },
  ];
  // console.log('\n');
  await inquirer.prompt(question);
};

const registerUser = async user => {
  const question = [
    {
      type: "input",
      name: "userName",
      user,
      validate(value) {
        if (value.length === 0) return "Please write something";
        return true;
      }
    }
  ]
  const { userName } = await inquirer.prompt(question)
  return userName
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'newText',
      message,
      validate(value) {
        if (message === 'Title: ') {
          if (value.length === 0) return 'Please write something';
          return true;
        }
        return true
      },
    },
  ];

  // tiene que coincidir el nombre de la const con el "name" en la question (newText)
  const { newText } = await inquirer.prompt(question);
  return newText;
};

const listDeletableTasks = async (tasks = []) => {
  const choices = tasks.map((taskItem, i) => {
    console.log(tasks)
    const idx = `${i + 1}.`.green;
    return {
      value: taskItem.id,
      name: `${idx} ${taskItem.title}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${'0.'.green} Cancel`,
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const checklistCompletableTasks = async (tasks = []) => {
  const choices = tasks.map((taskItem, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: taskItem.id,
      name: `${idx} ${taskItem.title}`,
      checked: taskItem.completedIn ? true : false,
    };
  });

  choices.unshift({
    value: 0,
    name: `${'0.'.green} Cancel`,
  });

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};


export {
  inquirerMenu,
  pause,
  readInput,
  listDeletableTasks,
  confirm,
  checklistCompletableTasks,
  registerUser
};

