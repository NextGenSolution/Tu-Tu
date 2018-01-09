import { Component, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { Ng2Uploader } from 'ng2-uploader/ng2-uploader';

import { InlineForm } from './components/inlineForm';
import { BlockForm } from './components/blockForm';
import { BasicForm } from './components/basicForm';
import { HorizontalForm } from './components/horizontalForm';
import { WithoutLabelsForm } from './components/withoutLabelsForm';
import { ResponsiveTable } from './components/responsiveTable';
import { HoverTable } from './components/hoverTable';

import { LayoutsService } from './layouts.service';

var alertify = require('alertify.js');

@Component({
  selector: 'layouts',
  styles: [require('./layoutsPictureUploader.scss')],
  encapsulation: ViewEncapsulation.None,
  directives: [InlineForm, BlockForm, HorizontalForm, BasicForm, WithoutLabelsForm, HoverTable, ResponsiveTable],
  template: require('./layouts.html'),
  providers: [Ng2Uploader, LayoutsService]
})

export class Layouts {

  file: File;
  imageConvertedString: any;
  @ViewChild('fileUpload') protected _fileUpload: ElementRef;

  public picResult: any = '';
  public result: any;
  public avatarString: any;
  uid: number;
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public details_error: Boolean = false;
  password: any;

  picture: string;

  public uploaderOptions: any = {
    url: 'assets/img/app/profile'
  };

  constructor(private renderer: Renderer, protected _uploader: Ng2Uploader, private _layoutsService: LayoutsService) {
    this.getProfilePicture();
  }

  ngOnInit() {
  }

  getProfilePicture() {
    this._layoutsService.getUserDetails().subscribe(result => {
      debugger
      this.result = result.userDetails;
      this.avatarString = result.avatar;
      this.result.forEach(element => {
        this.uid = element.uid;
       //  alert(result.avatar);
      });

      if (this.avatarString == "" || this.avatarString == null) {
        this.picture = 'assets/img/theme/no-photo.png';
      } else {
        this.picture = "data:image/jpeg;base64," + this.avatarString;
      }

    });
  }

  public clickUpdatePic() {

    this.imageConvertedString = (<HTMLInputElement>document.getElementById("base64textarea")).value;
    
    // alertify.confirm('Confirmation', 'Are you sure to update the Profile Picture?', function () {     
    //   //   this._layoutsService.updateProfilePic(2, this.imageConvertedString);    
    // }, function () {

    // });

     this._layoutsService.updateProfilePic(this.uid, this.imageConvertedString);
  
  // this.getProfilePicture();
  }

  show(input: any) {
    alert(input);
    if (input.files && input.files[0]) {
      var filerdr = new FileReader();
      filerdr.onload = function (e) {
      }
      filerdr.readAsDataURL(input.files[0]);
    }
  }


  public bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }


  public onFiles(): void {
    let files = this._fileUpload.nativeElement.files;
    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      this.getBase64(file);
    }
  }


  protected _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (<any>event.target).result;
    }, false);
    reader.readAsDataURL(file);

  }


  public getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (readerEvt: any) {
      var binaryString = readerEvt.target.result;
      (<HTMLInputElement>document.getElementById("base64textarea")).value = binaryString;
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }


}



