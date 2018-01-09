import {Component} from '@angular/core';
import {OnInit} from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from '@rxjs/Observable';
import {Http,Response,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';

import {LayoutsService} from '../../../../layouts.service';

@Component({
  selector: 'rating-inputs',
  template: require('./ratinginputs.html'),
   providers: [LayoutsService]
})

export class Rating {
  public result :any;
  public startCount:any;

  private _max1:number = 5;
  private _max2:number = 10;

  constructor(private _layoutService: LayoutsService) {
       this._layoutService.getUserDetails().subscribe(result => {
      this.result = result.userTaskDetails;
      this.result.forEach(element => {
      this.startCount =element.starCount;
      }); 
    });
  }

}
