import { Component, Input } from '@angular/core';
import { OnInit, NgModule } from '@angular/core'
import 'rxjs/add/operator/map';
import { Observable } from '@rxjs/Observable';
import { Http, Response, Headers, HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../../../theme/validators';


import { LayoutsService } from '../../layouts.service';

var alertify = require('alertify.js');

@Component({
  selector: 'basic-form',
  template: require('./basicForm.html'),
  providers: [LayoutsService]
})

export class BasicForm {

  public form: FormGroup;
  public details_error: Boolean = false;
  public result: any;
  uid: number;
  password: any;
  currentPassword: any;
  public passwords: FormGroup;

  validateCurrentPwd:boolean=false;
  validatePwd:boolean=false;

  constructor(private _layoutsService: LayoutsService) {
    this._layoutsService.getUserDetails().subscribe(result => {
      this.result = result.userDetails;
      this.result.forEach(element => {
        this.uid = element.uid;
        this.currentPassword = element.password;
      });
    });


  }


onKeyCurPwd(event: any){
 if(event == ""){
  this.validateCurrentPwd = false;  

 }
 else if (event != this.currentPassword) {   
      this.validateCurrentPwd = true;
    }
    else {
       this.validateCurrentPwd = false;      
    }
}

onKeyMatchPwds(confirmP: any, pwd:any){
 if (confirmP != pwd) {   
      this.validatePwd = true;
    }
    else {
       this.validatePwd = false;      
    }
}

onKeyPwd( pwd:any){
 if (pwd == "") {   
      this.validatePwd = false;
    }
}


  public clickEdit(currentPwd: string, pwd: any, confirmPwd: string) {

    this.password = pwd;

    if (currentPwd != this.currentPassword) {
      alertify.error("Invalid Current Password");
      this.validateCurrentPwd = true;
    }
    else {
  this.validateCurrentPwd = false;
      if (pwd != confirmPwd) {
        alertify.error("Passwords does not match");
      }
      else if (pwd == "" && confirmPwd == "") {
        alertify.error("Enter valid Passwords");
      }
      else {
 this._layoutsService.editPrvacyDetails(this.uid, pwd);

//         alertify
//           .okBtn("Yes")
//           .cancelBtn("Cancel")
//           .confirm("Are you sure to update the details?", function (ev) {
       
// //this._layoutsService.editPrvacyDetails(this.uid, pwd);           
//           }, function (ev) {
//             ev.preventDefault();
//           });

      }
    }

  }



}
