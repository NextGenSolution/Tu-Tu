import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import {routing} from './allTasks.routing';
import { AllTaskList } from './allTasks.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing
  ],
  declarations: [
    AllTaskList
  ]
})

export default class AllTaskListModule {}