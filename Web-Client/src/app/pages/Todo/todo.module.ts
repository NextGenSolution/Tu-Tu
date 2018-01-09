import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { routing }       from './todo.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { todo } from './todo.component';
import { todoLists } from './components/todoLists';
import { layouts } from './components/layouts';


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing
  ],
  declarations: [
    todoLists,
    todo,
    layouts,
    UPLOAD_DIRECTIVES
  ]
})
export default class TodoModule {}
