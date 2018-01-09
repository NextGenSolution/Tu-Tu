import {Injectable} from '@angular/core';
import {Http,Response,Headers,HTTP_PROVIDERS,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from '@rxjs/Observable';
import {Router} from '@angular/router';

import {User} from './User';

import {BlockForm} from './blockForm.component';

var alertify = require('alertify.js');

@Injectable()
export class BlockFormService{
BlockForm:any;

constructor(private _http:Http){
this._http = _http;
this.BlockForm = BlockForm;
 alertify.success("OK");
}

public getUserDetails(){
    return this._http.get('http://localhost:64759/Api/User/GetInfo').map(res=>res.json());
}

 updateUser(uid:number,fullName:string,email:string, admin:string,company:string){
 
 let url = "http://localhost:64759/Api/User/UpdateInfo?id=";

        let data = JSON.stringify({ 
            "uid":uid,
            "name":fullName,
            "email":email, 
            "companyName":company,
            "adminId":"1",
         
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

 //alertify.set('notifier','position', 'bottom-right');
 alertify.success('Current position : ');
alert("Came "+url+uid);
     
 // this._http.post((url+uid),data,headers).map(res=> res.json());
     this._http.put((url+uid),data,options).subscribe(
         response => {
             alertify.success("OK");
       }
       //,
   /*     error => {
               console.log(error.text());
               alertify.error("error");
        }*/
        );
    }

}