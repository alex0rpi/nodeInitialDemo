const { v4 } = require('uuid');
const uuidv4 = v4

class Task {
  id = '';
  user = ''
  description = '';
  startedIn = null;
  completedIn = null;

  constructor(name, title, description) {
    this.id = uuidv4();
    this.user = name;
    this.title = title;
    this.description = description;
    this.completedIn = null;
  }
}
module.exports = { Task };
