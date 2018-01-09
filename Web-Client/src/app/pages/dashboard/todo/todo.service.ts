import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: 'Meet the CEO' },
    { text: 'Go To SLIIT' },
    { text: 'Bring the lap' },
    { text: 'Finalize sep project.' },
    { text: 'Print sep docs' },
    { text: 'Meet the instructors' },
    { text: 'Get in touch with team' },
    { text: 'Write email to client' },
    { text: 'Have fun guys' },
    { text: 'What do you think?' },
  ];

  getTodoList() {
    return this._todoList;
  }
}
