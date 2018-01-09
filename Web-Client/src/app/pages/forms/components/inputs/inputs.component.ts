import { Component, ViewEncapsulation } from '@angular/core';

import { StandardInputs } from './components/standardInputs';
import { ValidationInputs } from './components/validationInputs';
import { GroupInputs } from './components/groupInputs';
import { CheckboxInputs } from './components/checkboxInputs';
import { Rating } from './components/ratinginputs';
import { Users } from './Users';
import { InputsService } from './inputs.service';
var alertify = require('alertify.js');


@Component({
  selector: 'inputs',
  encapsulation: ViewEncapsulation.None,
  directives: [StandardInputs, ValidationInputs, GroupInputs, CheckboxInputs, Rating],
  template: require('./userBadges.html'),
  providers: [InputsService]
})
export class Inputs {

  bestQualityOlderCount: number;
  creativityOlderCount: number;
  goodJobOlderCount: number;
  excellentOlderCount: number;
  goodQualityOlderCount: number;

  bestQualityCount: number;
  creativityCount: number;
  goodJobCount: number;
  excellentCount: number;
  goodQualityCount: number;

  resultBestQuality: any;
  resultGoodQuality: any;
  resultExcellent: any;
  resultCreativity: any;
  resultGoodJob: any;

  btnBQDisable: boolean = true;
  btnGQDisable: boolean = true;
  btnExcDisable: boolean = true;
  btnCrtDisable: boolean = true;
  btnGJbDisable: boolean = true;

  uId: number;
  users = [];

  constructor(private _inputsService: InputsService) {

    this._inputsService.getUsersForDropDown().subscribe(res => {
     this.clickUsersDropDwn(res[0].uid);
      res.forEach(element => {
        this.users.push({ name: element.name, id: element.uid });
      });
     
    });


  }

  clickUsersDropDwn(selectedUserId) {

    this._inputsService.getBadgesDetails(selectedUserId).subscribe(result => {

      this.uId = result.uId;
      this.resultBestQuality = result.bestQuality;
      this.resultGoodQuality = result.goodQuality;
      this.resultExcellent = result.excellent;
      this.resultCreativity = result.creativity;
      this.resultGoodJob = result.goodJob;


      if (this.resultBestQuality == "") {
        this.bestQualityCount = 0;
      }
      else {
        this.resultBestQuality.forEach(element => {
          this.bestQualityCount = element.count;
          this.bestQualityOlderCount = element.count;
        });
      }

      if (this.resultGoodQuality == "") {
        this.goodQualityCount = 0;
      }
      else {
        this.resultGoodQuality.forEach(element => {
          this.goodQualityCount = element.count;
          this.goodQualityOlderCount = element.count;
        });
      }

      if (this.resultExcellent == "") {
        this.excellentCount = 0;
      }
      else {
        this.resultExcellent.forEach(element => {
          this.excellentCount = element.count;
          this.excellentOlderCount = element.count;
        });
      }

      if (this.resultCreativity == "") {
        this.creativityCount = 0;
      }
      else {

        this.resultCreativity.forEach(element => {
          this.creativityCount = element.count;
          this.creativityOlderCount = element.count;
        });
      }

      if (this.resultGoodJob == "") {
        this.goodJobCount = 0;
      }
      else {
        this.resultGoodJob.forEach(element => {
          this.goodJobCount = element.count;
          this.goodJobOlderCount = element.count;
        });
      }

    });

  }


  clickRewardBadge(assigneeID, newCount, badgeType) {

  if (badgeType == "Best Quality") {
      this.bestQualityCount++;
    }

    else if (badgeType == "Good Quality") {
      this.goodQualityCount++;
    }

    else if (badgeType == "Excellent") {
      this.excellentCount++;
    }

    else if (badgeType == "Good Job") {
      this.goodJobCount++;
    }

    else if (badgeType == "Creativity") {
      this.creativityCount++;
    }

  this._inputsService.saveBadgeCount(assigneeID, badgeType, 1)
  }


/*
  clickUndo(assigneeID, newCount, badgeType) {

    var subtractValue;
    if (badgeType == "Best Quality") {
      subtractValue = this.bestQualityOlderCount - newCount;
      this.btnBQDisable = true;
    }

    else if (badgeType == "Good Quality") {
      subtractValue = newCount - this.goodQualityOlderCount;
      this.btnGQDisable = true;
    }

    else if (badgeType == "Excellent") {
      subtractValue = newCount - this.excellentOlderCount;
      this.btnExcDisable = true;
    }

    else if (badgeType == "Good Job") {
      subtractValue = newCount - this.goodJobOlderCount;
      this.btnGJbDisable = true;
    }

    else if (badgeType == "Creativity") {
      subtractValue = newCount - this.creativityOlderCount;
      this.btnCrtDisable = true;
    }

    this._inputsService.undoBadgeCount(assigneeID, badgeType, subtractValue)
  }
*/

}
