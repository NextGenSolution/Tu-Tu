import {Component, Input } from '@angular/core';
import {OnInit,NgModule } from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from '@rxjs/Observable';
import {Http,Response,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';

import {LayoutsService} from '../../layouts.service';
import {InputsService} from '../../../inputs/inputs.service';



@Component({
  selector: 'hover-table',
  template: require('./hoverTable.html'),
    providers: [LayoutsService,InputsService]
})
export class HoverTable {

  public result :any;
  uid:number;
  

bestQualityCount:number;
creativityCount:number;
goodJobCount:number;
excellentCount:number;
goodQualityCount:number;

resultBestQuality:any;
resultGoodQuality:any;
resultExcellent:any;
resultCreativity:any;
resultGoodJob:any;

 badgeTableData=[];

  constructor(private _layoutService: LayoutsService,private _inputsService: InputsService) {

    this._layoutService.getUserDetails().subscribe(result => {
      this.result = result.userDetails;
      this.result.forEach(element => {
      this.uid =element.uid;


 this._inputsService.getBadgesDetails(this.uid).subscribe(result => {

      this.resultBestQuality = result.bestQuality;
      this.resultGoodQuality = result.goodQuality;
      this.resultExcellent = result.excellent;
      this.resultCreativity = result.creativity;
      this.resultGoodJob = result.goodJob;


      if (this.resultBestQuality == "")
      {
          this.bestQualityCount=0;
      }
      else 
      {
         this.resultBestQuality.forEach(element => {
           this.bestQualityCount = element.count;      
         this.badgeTableData.push({
           image: 'assets/img/app/badges/qualityBest.png',
           title:"Best Quality", 
           count:element.count
          });

        });          
     }

      if(this.resultGoodQuality == "")
      {
          this.goodQualityCount=0;
      }
      else {
        this.resultGoodQuality.forEach(element => {
           this.goodQualityCount = element.count;
             this.badgeTableData.push(
               {
                image: 'assets/img/app/badges/highQuality.png',
                 title:"Good Quality",
                  count:element.count
                }
                );

        }); 
     }

       if(this.resultExcellent == "")
       {
          this.excellentCount=0;
       }
      else {
          this.resultExcellent.forEach(element => {
            this.excellentCount = element.count;   
              this.badgeTableData.push({
                image: 'assets/img/app/badges/excellent.png',
                title:"Excellent",                
                count:element.count});
     
         }); 
      }

    if(this.resultCreativity == "")
    {
          this.creativityCount=0;
      }
      else {
       
      this.resultCreativity.forEach(element => {
        this.creativityCount = element.count;
          this.badgeTableData.push({
             image: 'assets/img/app/badges/creativity.png',
            title:"Creativity", 
            count:element.count
          });

      }); 
   }

     if(this.resultGoodJob == "")
     {
          this.goodJobCount=0;
      }
      else {
        this.resultGoodJob.forEach(element => {
        this.goodJobCount = element.count;
          this.badgeTableData.push({
             image: 'assets/img/app/badges/goodJob.png',
            title:"Good Job", 
            count:element.count});

      }); 
   }

  });


      }); 
    });
//fix thissssss

 
  }

  


}
