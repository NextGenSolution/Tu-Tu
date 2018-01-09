import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {BaMsgCenterService} from './baMsgCenter.service';
import {BaProfilePicturePipe} from '../../pipes';
import {BaTimeAgoPipe} from '../../pipes';
import {Location} from '@angular/common';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styles: [require('./baMsgCenter.scss')],
  template: require('./baMsgCenter.html'),
  pipes: [BaProfilePicturePipe,BaTimeAgoPipe]
})
export class BaMsgCenter {

  public notifications:Array<Object>;
  public messages:Array<Object>;
  name;
  room;
  constructor(private _baMsgCenterService:BaMsgCenterService,private location: Location,private route: Router) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }
  Cliked(val){
    this.name = localStorage.getItem('userName');
    this.room = val;
    window.open("http://localhost:5000/?"+this.name+"&"+this.room);
  }
}
