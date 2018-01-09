import { Routes, RouterModule }  from '@angular/router';
import {TaskList} from './tasklist.component';

const routes: Routes = [
    {
        path:'',
        component : TaskList
    }
];

export const routing = RouterModule.forChild(routes);
