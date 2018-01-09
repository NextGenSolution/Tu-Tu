import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'pages',
    component: Pages,
    children: [
      
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
      { path: 'maps', loadChildren: () => System.import('./maps/maps.module') },
      { path: 'Todo', loadChildren: () => System.import('./Todo/todo.module') },
      {path: 'tasks',loadChildren:() => System.import('./tasks/tasks.module')},
      {path: 'tasklist',loadChildren:() => System.import('./tasklist/tasklist.module')},
      {path:'allTasksList',loadChildren:() => System.import('./allTaskList/allTasks.module')}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
