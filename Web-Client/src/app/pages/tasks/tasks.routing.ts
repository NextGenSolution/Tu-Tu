import { Routes, RouterModule }  from '@angular/router';

import {Tasks} from './task.component';

const routes: Routes = [
    {
        path:'',
        component : Tasks
    }
];

export const routing = RouterModule.forChild(routes);
