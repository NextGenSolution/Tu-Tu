import {Injectable} from '@angular/core';
import {Http,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Router}  from '@angular/router';
var alertify = require('alertify.js');
import {layouts} from './layouts.component';
var alertify = require('alertify.js');
import {BaThemeConfigProvider} from '../../../../theme';


@Injectable()
export class LayoutService {
  errorMessage: string;
  public headers: Headers;
  public heroes:any;
  people:any;
  todoLayout:any;
  constructor(private _http:Http) {
    this._http = _http;
    this.todoLayout = layouts;
}
  saveTodos(listbox,listTeamOne,listTeamTwo){

    let url = "http://localhost:64759/Api/Todo/SaveTodo";
    let body = { 
                  TodoItems:{
                    listbox
                  },
                  ProgressItems:{
                     listTeamOne
                    },
                  DoneItems:{
                    listTeamTwo
                    }
                };
                debugger;
    var data = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url,data, options).subscribe(
            response => {
              if(response.ok){
                alertify.success("Succesfully Saved!"); 
              }else{
                alertify.error("Error Occurured while Saving!");  
              }
       },
        error => {
                alertify.error("Error Occurured while Saving! Please check the server connection");
       }
    );
}
    //TODO
    public getProjectStartCount(){
      return this._http.get('http://localhost:64759/Api/TodoLayout/getAllTaskCountLists').map(
          res=>res.json());
    }
    public getTodoItems(){
        return this._http.get('http://localhost:64759/Api/TodoLayout/GetAllTasks').map(
          res=>res.json());
    }

    public getUnAssignedTasks(){
        return this._http.get('http://localhost:64759/Api/TodoLayout/GetAllUnassignedTodoLists').map(
          res=>res.json());
    }
    saveUnassignedTasks(listbox){

    let url = "http://localhost:64759/Api/TodoLayout/SaveAssignedTask";
    let body = { 
                  listbox:listbox
                };
                debugger;
    var data = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url,data, options).subscribe(
            response => {
              if(response.ok){
                location.reload();
                alertify.success("Succesfully Saved!"); 
              }else{
                alertify.error("Error Occurured while Saving!");  
              }
       },
        error => {
                alertify.error("Error Occurured while Saving! Please check the server connection");
       }
    );
}
arrayItem1:Array<string> = [];


   
}
