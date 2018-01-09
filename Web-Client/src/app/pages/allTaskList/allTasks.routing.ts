import { Routes, RouterModule }  from '@angular/router';
import {AllTaskList} from './allTasks.component';

const routes: Routes = [
    {
        path:'',
        component : AllTaskList
    }
];

export const routing = RouterModule.forChild(routes);