import {Injectable} from '@angular/core';
import {Http,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Router}  from '@angular/router';
import _ from "lodash";
var alertify = require('alertify.js');

@Injectable()
export class TaskListService{

    constructor(private _http : Http) {
  
    }

    //variabl declaration
    searchTaskList=[];
    myTasks=[];

    //Method to get and return the tasks in to the array.
    GetTask(){
          Observable.fromPromise(this.getMyTasks());
          return this.myTasks;
    }

    //Get all the tasks created by logged in user
    getMyTasks(){
        this.myTasks =[];
         return new Promise((resolve,reject) => {
            this._http.get('http://localhost:64759/api/Activities/myTasks').flatMap(res => res.json()).subscribe(
                response => {
                    // debugger;
                    this.myTasks.push(response);
                    resolve(this.myTasks);
                }
            );
                    });

    }

    //Method to get the Tasks corresponding to the search term form the API
    searchTasks(searchTerm){
        this.searchTaskList = [];
         var url="http://localhost:64759/api/Activities/searchMyTasks?term="+searchTerm;
         return new Promise((resolve,reject) => {
            this._http.get(url).flatMap(res => res.json()).subscribe(
                response => {
                    this.searchTaskList.push(response);   
                    resolve(this.searchTaskList);
                }
            );
        });
    }

    //Method to call the update rate API
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
                alertify.error("Error Occurured while Saving! Please check the server connection");
                 }
        );
    }
}