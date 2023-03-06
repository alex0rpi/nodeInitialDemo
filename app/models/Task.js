import { v4 as uuidv4 } from 'uuid';

class Task {
  id = '';
  description = '';
  completedIn = null;
  constructor(title, description) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.completedIn = null;
  }
}
export { Task };
