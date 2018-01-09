import {Injectable} from '@angular/core';
import {Http,Response,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from '@rxjs/Observable';
import {Router} from '@angular/router';

import {HoverTable} from './hoverTable.component';
var alertify = require('alertify.js');

@Injectable()
export class HoverTableService{
HoverTable:any;

constructor(private _http:Http){
this._http = _http;
this.HoverTable = HoverTable;

}

}