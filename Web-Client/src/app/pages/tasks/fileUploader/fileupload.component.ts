import {Component} from '@angular/core'

@Component({
    selector:'fileUploader',
    template:require('./fileUpload.html')
})

export class Fileuploader{

 public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}