import {Component, ViewEncapsulation} from '@angular/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd';
import {LayoutService} from './layouts.service';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {BaThemeConfigProvider} from '../../../../theme';

@Component({
  selector: 'todoLayout',
  encapsulation: ViewEncapsulation.None,
  template: require('./layouts.html'),
  styles: [require('./layout.scss')],
  directives: [DND_DIRECTIVES],
  providers: [DND_PROVIDERS,LayoutService,BaThemeConfigProvider],
})
export class layouts {
    public logError:any;
    public onEditing = false;
    public companies : any;
    public ProgressEditing : any;
    public data : any;
    
  constructor(private _LayoutService : LayoutService) {
    this.companies=[];
    
    this._LayoutService.getUnAssignedTasks().subscribe(
      data => {this.companies = data},
      err => this.logError(err),
      () =>  this.companies.forEach(element => {
       
        if(element.status=="Rated"){
            this.RatedBox.push({'Title':element.title,'Description':element.description,
            'completeness':element.completeness,'expiryDate':element.expiryDate,'assigner':element.assigner,
            'starCount':element.starCount,'filePath':element.filePath,'remainingDays':element.remainingDays});
            
        }else{
            this.listTeamOne.push({'Title':element.title,'Description':element.description,
            'completeness':element.completeness,'expiryDate':element.expiryDate,'assigner':element.assigner,
            'starCount':element.starCount,'filePath':element.filePath,'remainingDays':element.remainingDays});
         }
      }));
      this.data = this.getAll();
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
viewData(){
    
}
saveUnassignedTasks(){
     //   alertify.confirm("Are you sure to want to save these changes to TODO items?",
 // function(){
 //     debugger;
      this._LayoutService.saveUnassignedTasks(this.listBoxers);
  //},
 // function(){
 //   alertify.error('Cancelled');
 // });
}
public getAll() {
    debugger;
    this._data.simpleLineData.series.push([2,3,4,3,4]);
    return this._data;
  }
  private _data = {
    simpleLineOptions: {
      color: 'black',
      fullWidth: true,
      height: '300px',
      chartPadding: {
        right: 40
      }
    },
    simpleLineData: {
      labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'],
      series: [
        [],
        
      ]
    },
    
  };
  listBoxers:Array<string> = [];
  listTeamOne:Array<string> = [];
  RatedBox:Array<string> = [];
}