import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from '@rxjs/Observable';
import { Router } from '@angular/router';

import { Layouts } from './layouts.component';

import { BlockForm } from './components/blockForm/blockForm.component';

var alertify = require('alertify.js');

@Injectable()
export class LayoutsService {
    LayoutForm: any;
    constructor(public _http: Http) {
        this._http = _http;
        this.LayoutForm = Layouts;
    }

    public getUserDetails() {
        return this._http.get('http://localhost:64759/Api/User/GetInfo').map(res => res.json());
    }

    updateProfilePic(uid: number, avatar: any) {
        let url = "http://localhost:64759/Api/User/UploadPic";

        let data = JSON.stringify({
            "uid": uid,
            "avatar": avatar
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //this._http.post((url),avatar,headers).map(res=> res.json());

        this._http.post((url), data, options).subscribe(
            response => {
                alertify.success("OK");
            }
        );
    }

    updateUserBasic(uid: number, fullName: string, email: string, admin: string, company: string) {

        let url = "http://localhost:64759/Api/User/UpdateInfo?id=";

        let data = JSON.stringify({
            "uid": uid,
            "name": fullName,
            "email": email,
            "companyName": company,
            "adminId": "1",

        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // this._http.post((url+uid),data,headers).map(res=> res.json());
        this._http.put((url + uid), data, options).subscribe(
            response => {
                alertify.success("Successfully Updated!");
            }
            //,
            /*     error => {
                        console.log(error.text());
                        alertify.error("error");
                 }*/
        );
    }

    public editPrvacyDetails(uid: number, pwd: string) {

        let url = "http://localhost:64759/Api//User/EditPrivacyInfo?id=";

        let data = JSON.stringify({
            "uid": uid,
            "password": pwd
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this._http.put((url + uid), data, options).subscribe(
            response => {
                alertify.success("OK");
            }
        );
    }



}