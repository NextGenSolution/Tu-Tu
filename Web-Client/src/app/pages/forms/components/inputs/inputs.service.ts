import {Injectable} from '@angular/core';
import {Http,Response,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from '@rxjs/Observable';
import {Router} from '@angular/router';

import {Inputs} from './inputs.component';

var alertify = require('alertify.js');

@Injectable()
export class InputsService{
    InputForm:any;

constructor(private _http:Http){
this._http = _http;
this.InputForm = Inputs;
}

public getUsersForDropDown(){
    return this._http.get('http://localhost:64759/Api/User/GetUsersForBadges').map(res=>res.json());
}

public getBadgesDetails(userId:number){

            let body={
            userId:userId          
            }
        let url = "http://localhost:64759/Api/User/GetBadgesInfo?userId="+userId;
        
        let data = JSON.stringify(userId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

       return this._http.post(url,options).map(res=>res.json());
}

 public saveBadgeCount(uid:number,badgeType:string,count:number){
 
 let url = "http://localhost:64759/Api/User/SaveBadgesCount";
        let body={
            uId:uid,
            badgeType:badgeType,
            count : count
        }

        let data = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

     this._http.post((url),data,options).subscribe(
         response => {
             alertify.success("OK");
       }
        );
    }

public undoBadgeCount(uid:number,badgeType:string,count:number){
 
 let url = "http://localhost:64759/Api/User/UndoBadgesCount";
      
        let body={
            uId:uid,
            badgeType:badgeType,
            count : count
        }

        let data = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

     this._http.post((url),data,options).subscribe(
         response => {
             alertify.success("OK");
       }
        );
    }


}