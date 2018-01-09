import {Component, ViewEncapsulation} from '@angular/core';

import {todoLayout} from './components/todoLayout';

@Component({
  selector: 'todoLayout',
  directives: [todoLayout],
  styles: [],
  template: require('./todoLists.html'),
})
export class todoLists {
  constructor(
    
  ) {}
}
