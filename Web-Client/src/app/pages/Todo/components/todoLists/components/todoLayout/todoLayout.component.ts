import {Component,Inject,OnInit} from '@angular/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Http, RequestOptions, HTTP_PROVIDERS} from '@angular/http';
import {TodoLayoutService} from './todoLayout.services';

var alertify = require('alertify.js');
@Component({
  selector: 'basic-form',
  template: require('./todoLayout.html'),
  
  styles: [require('./todolist.scss')],
  directives: [DND_DIRECTIVES],
  providers: [DND_PROVIDERS,TodoLayoutService],
})

export class todoLayout {
   public companies : any;
   public NotificationStore : any;
   public logError:any;
   public onEditing = false;
   public ProgressEditing = false;
   private _max1:number = 5;
   public taskcountss:any;
   public charts : any;
   public data : any;

getData(taskCount) {
    //let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    var pieColor = 'red';
    return [
      {
        color: pieColor,
        description: 'All Progress Tasks',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Isolated Tasks',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Completed & not Rated tasks',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Completed and Rated Tasks',
        stats: taskCount,
        icon: 'refresh',
      }
    ];
  }
   taskCount:Array<string> = [];
    listBoxers:any;
    listTeamOne:Array<string> = [];
    listTeamTwo:Array<string> = [];
    listTeamTwoDesc:Array<string> = [];
    NotificationContainer : Array<string> = [];
constructor(private _TodoLayoutService:TodoLayoutService) {
    
    this.companies=[];
    
          debugger;    
    this._TodoLayoutService.getTaskCount().subscribe(
      data => {this.taskcountss = data},
      err => this.logError(err),
      () =>  this.taskcountss.forEach(element => {
         this.taskCount.push(element.progressTasksCount);         
    }));

    this.charts = this.getData(this.taskCount[0]);

    this._TodoLayoutService.getTodoItems().subscribe(
      data => {this.companies = data},
      err => this.logError(err),
      () =>  this.companies.forEach(element => {
        if(element.status=="Done"){
            this.listTeamTwo.push({'Title':element.title,'Description':element.description,
            'completeness':element.completeness,'expiryDate':element.expiryDate,'assigner':element.assigner,
            'starCount':element.starCount,'filePath':element.filePath,'remainingDays':element.remainingDays});
        }else if(element.status=="Progress"){
            this.listTeamOne.push({'Title':element.title,'Description':element.description,
            'completeness':element.completeness,'expiryDate':element.expiryDate,'assigner':element.assigner,
            'starCount':element.starCount,'filePath':element.filePath,'remainingDays':element.remainingDays});
        }else if(element.status=="Todo"){
            this.listBoxers.push({'Title':element.title,'Description':element.description,
            'completeness':element.completeness,'expiryDate':element.expiryDate,'assigner':element.assigner,
            'starCount':element.starCount,'filePath':element.filePath,'remainingDays':element.remainingDays});
        } 
    }));
        this.listBoxers =  [];    
}
fileUpload(){
    this._TodoLayoutService.UploadFile();
}
show(){
    this.onEditing = true;
}
hide(){
    this.onEditing = false;
}
showProgressDesc(){
    this.ProgressEditing = true;
}
hideProgressDesc(){
    this.ProgressEditing = false;
}
 deleteCompletedTask(title){
        //alertify.confirm("Are you sure to want to remove this item?",
 // function(){
 //     debugger;
      this._TodoLayoutService.deleteCompeltedTask(title);
  //},
 // function(){
 //   alertify.error('Cancelled');
 // }); 
     
 }
showHistory(){
    this._TodoLayoutService.getNotificationItems().subscribe(
      data => {this.NotificationStore = data},
      err => console.log(err),
      () =>  this.NotificationStore.forEach(element => {
          debugger;
          this.NotificationContainer.push(element);
    }));
}
removeNotifications(){
    this.NotificationContainer = [];
}
saveTodos(){
var todoLists :any;
var progressLists :any;
var doneLists :any;
todoLists = this.listBoxers;
progressLists = this.listTeamOne;
doneLists = this.listTeamTwo;
debugger;
  //   alertify.confirm("Are you sure to want to save these changes to TODO items?",
 // function(){
 //     debugger;
      this._TodoLayoutService.saveTodos(todoLists,progressLists,doneLists);
  //},
 // function(){
 //   alertify.error('Cancelled');
 // });   


}
 
}