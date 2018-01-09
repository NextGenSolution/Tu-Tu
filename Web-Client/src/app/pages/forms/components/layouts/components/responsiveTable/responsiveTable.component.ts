import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import 'rxjs/add/operator/map';
import { Observable } from '@rxjs/Observable';
import { Http, Response, Headers, HTTP_PROVIDERS, RequestOptions } from '@angular/http';

import { LayoutsService } from '../../layouts.service';
import { Rating } from './components/ratinginputs';

@Component({
  selector: 'responsive-table',
  template: require('./responsiveTable.html'),
  providers: [LayoutsService],
  directives: [Rating]
})

export class ResponsiveTable {

  public result: any;
  public taskTableHidden: boolean;
  public NothingLblHidden: boolean=true;

  uid: number;
  count: number = 0;

  private _max1:number = 5;
  private _max2:number = 10;

  constructor(private _layoutService: LayoutsService) {

    this._layoutService.getUserDetails().subscribe(result => {
      this.result = result.userTaskDetails;

      if (this.result == null || this.result == "") {

        this.taskTableHidden = true;
        this.NothingLblHidden = false;
      }
      else {
        this.taskTableHidden = false;
        this.NothingLblHidden = true;
        this.result.forEach(element => {
          this.uid = element.uid;
        });
      }

    });



  }

}
