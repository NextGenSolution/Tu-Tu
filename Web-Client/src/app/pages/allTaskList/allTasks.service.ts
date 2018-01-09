import {Injectable} from '@angular/core';
import {Http,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Router}  from '@angular/router';
import _ from "lodash";
var alertify = require('alertify.js');

@Injectable()

export class AllTaskListService{

     constructor(private _http : Http) {
  
    }

    taskList=[];
    searchTaskList=[];

    //get all the tasks
    GetAllTask(){
          Observable.fromPromise(this.getAllTasks());
          return this.taskList;
    }
    getAllTasks(){
        this.taskList=[];
        return new Promise((resolve,reject)=>{
            this._http.get('http://localhost:64759/api/Activities/allTasks').flatMap(res => res.json()).subscribe(
                response => {
                    this.taskList.push(response);
                    resolve(this.taskList);
                }
            );
        });
    }

    UpdateRate(taskId,count){
        let url="http://localhost:64759/api/Activities/rating";
        let body={
            id : taskId,
            starCount : count
        }
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
               // alertify.error("Error Occurured while Saving! Please check the server connection");
                 }
        );
    }

    searchTasks(searchTerm){
        this.searchTaskList = [];
         var url="http://localhost:64759/api/Activities/searchTasks?term="+searchTerm;
         return new Promise((resolve,reject) => {
            this._http.get(url).flatMap(res => res.json()).subscribe(
                response => {
                    this.searchTaskList.push(response);   
                    resolve(this.searchTaskList);
                }
            );
        });
    }
}