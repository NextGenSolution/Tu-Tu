import {Component} from '@angular/core'
import {TasksService} from './tasks.service'
import {Tile} from './emp.component'
import {Http,HTTP_PROVIDERS} from '@angular/http'
import {Observable} from 'rxjs/Rx'
var alertify = require('alertify.js');

@Component({
    selector:'tasks',
    styles:[require('./tasks.scss')],
    template:require('./tasks.html'),
    providers:[TasksService],
    directives:[Tile]
})
export class Tasks{
    categoryList;
    selectedItem = "Select Category";
    clickedAddNew=false;
    tiles : any[];
    receivedData:Array<any> = [];
    varTitle : string;
    description : string;
    category : string;
    expirtyDate : any;
    assignee :string;
    pending=false;
    taskList;
    users:any[];
    validDate=false;
    validType=false;

    //For date time picker
    todaydate = new Date();
    day=this.todaydate.getDate();
    month=this.todaydate.getMonth()+1;
    year=this.todaydate.getFullYear();

    myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd/mm/yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: {year: this.year, month: this.month, day: this.day},
        selectionTxtFontSize: '14px'
    };

    //Constructor
    constructor(private _TasksService : TasksService){
        this.categoryList=_TasksService.getTasks();
       // this.tiles = _TasksService.getAssignees();
        this.users=_TasksService.getAllUsers();
    }

    //Function for search and filtering
    ngAfterViewInit(){
    var keyups = Observable.fromEvent($("#search"), "keyup")
    .map(e => e.target.value)
    .debounceTime(400)
    .distinctUntilChanged()
    .flatMap(searchTerm => {
        this.pending =true;
        this.users = [];
        var promise;
        if(searchTerm.length==0)
        {   
            promise=this._TasksService.getUsers();
            return Observable.fromPromise(promise);
        }else
        {
            promise = this._TasksService.searchUsers(searchTerm);
            return Observable.fromPromise(promise);
        }
        // promise = this._TasksService.searchUsers(searchTerm);
        // return Observable.fromPromise(promise);
    });
    keyups.subscribe(data => {console.log(data);
       this.users = [];
       data.forEach(element => {
           this.users.push(element);
       });
       this.pending =false;
       console.log(this.users);
    });

}
    //Handling category click
    onListClick(item){
        this.selectedItem = item;
        this.category= item;
    }

    addedNew(){
        this.clickedAddNew=!this.clickedAddNew;
    }

    //Method to get the date from date time picker
     onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ',
         event.epoc);
         this.expirtyDate=event.formatted;
    }
    transferDataSuccess($event) {
        this.receivedData.pop();
        this.receivedData.push($event.dragData.name);
        this.assignee=$event.dragData.name;
    }

    //Method to save the Task
    saveTask(){
        console.log("selected item "+this.selectedItem);
        console.log("selected expory "+this.expirtyDate);

        if(this.selectedItem=="Select Category"){
            alertify.error("Please select a task category!");
        }else{
            this.validType=true;
        }

        if(typeof(this.expirtyDate)==typeof(undefined)){
            alertify.error("Please selecta an expiry date!");
        }else{
            this.validDate=true;
        }

        if(this.validType && this.validDate){
            this._TasksService.saveTasks(this.varTitle,this.description,this.category,this.expirtyDate,this.assignee);
        }
    }

    // //Method to get all tasks created by the logged in user
    // getTaskList(){
    //     this._TasksService.GetTasks();
    // }

}