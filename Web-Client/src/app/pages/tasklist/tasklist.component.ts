import {Component} from '@angular/core'
import {TaskListService} from './tasklist.service'
import {Observable} from 'rxjs/Rx'
var alertify = require('alertify.js');

@Component({
    selector:'tasklist',
    template:require('./tasklist.html'),
    styles:[require('./tasklist.scss')],
    providers:[TaskListService]
})

export class TaskList{

    //variable declaration
    public taskArray;
    taskName:any;
    private _max1:number = 5;
    pending=false;
    linkVisibility:"hidden";
    isClicked = false;
    count;
    default1

    //constructor
    constructor(private _TaskListService : TaskListService){
        this.taskArray = _TaskListService.GetTask();
    }

//Method to call update rate function of the service
updateRate(taskid:string,count:number,status:string,index:number){
    if(status=="Done"){
        this._TaskListService.UpdateRate(taskid,count);
    }else{
        this.taskArray[index].starCount=0;
        alertify.error("You cannot rate for a un-done tasks!");
    }
}

//Method to search and filter the tasks
ngAfterViewInit(){
    var keyups = Observable.fromEvent($("#search"), "keyup")
    .map(e => e.target.value)
    .debounceTime(400)
    .distinctUntilChanged()
    .flatMap(searchTerm => {
        this.pending =true;
        this.taskArray = [];
        var promise;
        if(searchTerm.length == 0)
        {
            this.taskArray=[];
            promise =this._TaskListService.getMyTasks();
            return Observable.fromPromise(promise);
        }else{
            this.taskArray=[];
            promise = this._TaskListService.searchTasks(searchTerm);
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

    //Method to shoe the attachment link
    showLink(item,count){
        this.count = count; 
        if(!this.isClicked && item.status == "Done"){
            this.isClicked = true;
        }else{
            this.isClicked = false;
        }
    }
}