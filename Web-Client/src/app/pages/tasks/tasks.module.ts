import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import {routing} from './tasks.routing';
import { Tasks } from './task.component';
import { MyDatePickerModule } from 'mydatepicker';
import {DndModule} from 'ng2-dnd';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing,
    MyDatePickerModule,
    DndModule.forRoot()
  ],
  declarations: [
    Tasks
  ]
})
export default class TasksModule {}
