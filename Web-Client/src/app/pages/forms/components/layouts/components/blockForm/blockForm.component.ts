import { Component, Input } from '@angular/core';
import { OnInit, NgModule } from '@angular/core'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { Http, Response, Headers, HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalModule } from "ng2-modal";
import { User } from './User';

import { BlockFormService } from './blockForm.service';
import { LayoutsService } from '../../layouts.service';

var alertify = require('alertify.js');

@Component({
  selector: 'block-form',
  template: require('./blockForm.html'),
  providers: [BlockFormService, LayoutsService]
})

export class BlockForm {
  values = '';
  public result: any;
  public avatarString: any;
  opened: boolean = false;

  uid: number;
  txtFirstName: string;
  txtLastName: string;
  txtEmail: string;
  fullname: string;
  company: string;
  admin: string;
  previousFullname: string;
  validateEmail: boolean;
  btnSaveDisable:boolean;

  constructor(private _blockFormService: BlockFormService, private _layoutsService: LayoutsService) {
    this._layoutsService.getUserDetails().subscribe(result => {
      this.result = result.userDetails;
      this.result.forEach(element => {
        this.uid = element.uid;

     //   this.previousFullname = element.fname + " " + element.lname;

      });

    });

  }

  onKey(event: any) {
    var checkEmail = event.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    if (checkEmail == null) {
      this.validateEmail = true;
    } else {
      this.validateEmail = false;
    }
  }



  public updateUser(firstName: string, email: string, admin: string, company: string) {

    this.txtFirstName = firstName;
    //this.txtLastName = lastName;
    this.txtEmail = email;
    this.fullname = firstName;
    this.admin = "1";
    this.company = company;

 this._layoutsService.updateUserBasic(this.uid, this.fullname, this.txtEmail, this.admin, this.company);
    // if (this.fullname != this.previousFullname) {

    // }

    // alertify.confirm('Confirmation', 'Are you sure to update the details?', function () {
    //   this._layoutsService.updateUserBasic(this.uid, this.fullname, this.txtEmail, this.admin, this.company)
    // }, function () {

    // });



  }

}


