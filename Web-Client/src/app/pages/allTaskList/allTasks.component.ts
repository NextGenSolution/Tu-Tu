import {Component} from '@angular/core'
import {AllTaskListService} from './allTasks.service'
import {Observable} from 'rxjs/Rx'
var alertify = require('alertify.js');

@Component({
    selector:'allTasksList',
    template:require('./allTasks.html'),
    styles:[require('./allTasks.scss')],
    providers:[AllTaskListService]
})

export class AllTaskList{

    taskArray=[];
    pending=false;
    private _max1:number = 5;
    isClicked = false;
    count;

     constructor(private _AllTaskListService : AllTaskListService){
         this.taskArray = _AllTaskListService.GetAllTask();
    }

    updateRate(taskid:string,count:number,status:string,index:number){
        if(status=="Done"){
            this._AllTaskListService.UpdateRate(taskid,count);
        }else{
            this.taskArray[index].starCount=0;
            alertify.error("You cannot rate for a un-done tasks!");
        }
    }

    ngAfterViewInit(){
    var keyups = Observable.fromEvent($("#search"), "keyup")
    .map(e => e.target.value)
    // .filter(text => text.length >= 3)
    .debounceTime(400)
    .distinctUntilChanged()
    .flatMap(searchTerm => {
        this.pending =true;
        this.taskArray = [];
        var promise;
        if(searchTerm.length == 0)
        {
            this.taskArray=[];
            promise =this._AllTaskListService.getAllTasks();
            return Observable.fromPromise(promise);
        }else{
            this.taskArray=[];
            promise = this._AllTaskListService.searchTasks(searchTerm);
            return Observable.fromPromise(promise);
        }
    });
    keyups.subscribe(data => {console.log(data);
       this.taskArray = [];
       data.forEach(element => {
           this.taskArray.push(element);
       });
       this.pending =false;
       console.log(this.taskArray);
    });

}

showLink(item,count){
        this.count = count; 
        if(!this.isClicked && item.status == "Done"){
            this.isClicked = true;
        }else{
            this.isClicked = false;
        }
    }

}