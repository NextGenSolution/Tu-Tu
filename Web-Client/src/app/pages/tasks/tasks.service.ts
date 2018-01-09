import {Injectable} from '@angular/core';
import {Http,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Router}  from '@angular/router';
import _ from "lodash";
var alertify = require('alertify.js');

@Injectable()
export class TasksService{

    //variables
    task = [];
    aa=[];
    users=[];

    //Constructor
    constructor(private _http : Http) {
  
    }
    
    //Return the set of valid document categories
    getTasks():string[]{
        return ['Blog post','User mannual','Research paper','E-mail','Word Document','Presentation','Paper Article','Html Doc','SRS'];
    }

    //Method to call "add Task" API
    saveTasks( titles, description,category,expirtyDate,assignee){
        let url = "http://localhost:64759/api/Activities/addTask";
        let bodys = {
                title : titles,
                description : description,
                categoryName : category,
                expiryDate : expirtyDate,
                attachemts : "null",
                assignee : assignee,
                status : "Todo",
                starCount : 0
        };
        
        var data = JSON.stringify(bodys);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
         this._http.post(url,data, options).subscribe(
            response => {
              if(response.ok){
                alertify.success("Succesfully Saved!"); 
              }else{
                alertify.error("Error Occurured while Saving!");  
              }
              location.reload();
       },
        error => {
                alertify.error("Error Occurured while Saving! Please check the server connection");
                 }
        );
        } 

    //API call to get all the registered users
    getAllUsers(){
          Observable.fromPromise(this.getUsers());
          return this.users;
    }
    getUsers(){
        this.users=[];
        return new Promise((resolve,reject) => {
            this._http.get('http://localhost:64759/api/Activities/getAllUsers').flatMap(res => res.json()).subscribe(
                response => {
                    // debugger;
                    this.users.push(response);
                    resolve(this.users);
                }
            );
                    });
    }
    
    // getAssignees() {
        
    //     return [
    //     { 
    //         imageUrl: "http://lorempixel.com/60/60/people?1",
    //         body: "Freddy Doo"
            
    //     },
    //     { 
    //         imageUrl: "http://lorempixel.com/60/60/people?2",
    //         body: "Wilma Doo"
    //     },
    //     { 
    //         imageUrl: "http://lorempixel.com/60/60/people?3",
    //         body: "Dafny Doo"
    //     },
    //     { 
    //         imageUrl: "http://lorempixel.com/60/60/people?4",
    //         body: "Shaggy Doo"
    //     },
    //     { 
    //         imageUrl: "http://lorempixel.com/60/60/cats?1",
    //         body: "Scooby Doo"
    //     }
    //     ];
    // }

   GetTasks(){
       return new Promise((resolve,reject) => {
        
      this._http.get('http://localhost:64759/api/Activities/ab').map(res => res.json()).subscribe(
                response => {
                            debugger;

                    this.task.push(response);
                    debugger
                    return this.task;
                }
                
            );
        });
    }

    //API call to get the suggested users on the search term
    searchUsers(searchTerm){
        this.aa = [];
         var url="http://localhost:64759/api/Activities/searchUser?term="+searchTerm;
         return new Promise((resolve,reject) => {
            this._http.get(url).flatMap(res => res.json()).subscribe(
                response => {
                    this.aa.push(response);   
                    resolve(this.aa);
                }

            );
                    
        });
    }

}