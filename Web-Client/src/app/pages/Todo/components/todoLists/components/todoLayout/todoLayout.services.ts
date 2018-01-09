import {Injectable} from '@angular/core';
import {Http,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Router}  from '@angular/router';
var alertify = require('alertify.js');
import {todoLayout} from './todoLayout.component';

@Injectable()
export class TodoLayoutService {
  errorMessage: string;
  public headers: Headers;
  public heroes:any;
  people:any;
  todoLayout:any;
  constructor(private _http:Http) {
    this._http = _http;
    this.todoLayout = todoLayout;
}

arrayItem1:Array<string> = [];


public UploadFile(){
  let url = "http://localhost:64759/Api/Todo/UploadFile?title='hello'"
  debugger;
    let body = {
      title:"hello"
    }
    var data = body;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url,data, options).subscribe(
            response => {
              if(response.ok){
                alertify.success("Successuflly Deleted"); 
              }else{
                alertify.error("Error occured whitle Deleting");  
              }
       },
        error => {
                alertify.error("Error Occurured while Deleting! Please check the server connection");
       }
    );
}
public saveTodos(listbox,listTeamOne,listTeamTwo){
  debugger;
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

    var data = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this._http.post(url,data, options).subscribe(
            response => {
          alertify.success("Successuflly Saved");
       },
        error => {
            console.log(error.text());
       }
    );
}
public deleteCompeltedTask(title){
   let url = "http://localhost:64759/Api/Todo/DeleteCompletedTask?deleteTaskViewModel="+title+"";
    let body = { 
                  "deleteTaskViewModel": title
                };
                debugger;
    var data = body;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url,data, options).subscribe(
            response => {
              if(response.ok){
                alertify.success("Successuflly Deleted"); 
                location.reload();
              }else{
                alertify.error("Error occured while Deleting");  
              }
       },
        error => {
                alertify.error("Error Occurured while Deleting! Please check the server connection");
       }
    );
}
   public getTodoItems(){
        return this._http.get('http://localhost:64759/Api/Todo/GetItems').map(
          res=>res.json());
    }

     public getNotificationItems(){
        return this._http.get('http://localhost:64759/Api/Todo/getNotificationHistory').map(
          res=>res.json());
    }
    public getTaskCount(){
        return this._http.get('http://localhost:64759/Api/TodoLayout/getAllTaskCountLists').map(
          res=>res.json());
    }
}
