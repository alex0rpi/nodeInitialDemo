/*
 _listado:
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:91231 } },
    { uuid-123712-123123-2: { id:12, description: kjdfhskf, completedIn:"1232134" } },
*/

import { Task } from './Task.js';
import 'colors';

class List {
  _listado = {}; // _ simboliza elemento privado

  constructor() {
    this._listado = {};
  }
}
export { List };
