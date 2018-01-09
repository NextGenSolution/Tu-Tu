import { Routes, RouterModule }  from '@angular/router';

import { todo } from './todo.component';
import { todoLists } from './components/todoLists/todoLists.component';
import { layouts } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: todo,
    children: [
      { path: 'todoLists', component: todoLists },
      { path : 'layouts',component:layouts}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
