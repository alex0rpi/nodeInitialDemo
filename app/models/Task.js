import { v4 as uuidv4 } from 'uuid';

class Task {
  id = '';
  user = ''
  description = '';
  completedIn = null;

  constructor(name, title, description) {
    this.id = uuidv4();
    this.user = name;
    this.title = title;
    this.description = description;
    this.completedIn = null;
  }
}
export { Task };
