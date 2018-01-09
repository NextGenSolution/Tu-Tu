import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {CalendarService} from './calendar.service';

@Component({
  selector: 'calendar',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./calendar.scss')],
  template: require('./calendar.html'),
  providers: [CalendarService]
})
export class Calendar {

  public calendarConfiguration:any;
  private _calendar:Object;
  public messages:Array<Object>;
  commentOperation:Observable<Array<Object>>;

  constructor(private _calendarService:CalendarService) {
    setTimeout(function(){},1000000);
    this.calendarConfiguration = this._calendarService.getData();
    this.calendarConfiguration.events = this.messages;
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }

  private _onSelect(start, end):void {
    this.calendarConfiguration.events = this.messages; 
    if (this._calendar != null) {
      var title = prompt('Event Title:');
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end,
          uid: 1
        };
        this._calendarService.postEvent(eventData);
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }

  ngOnInit() {
        this.getEvent();
    }
  getEvent(){
    this._calendarService.GetEvent().subscribe(res =>{ 
      this.messages = res;
      res.forEach(element => {
      jQuery(this._calendar).fullCalendar('renderEvent',element, true);
      });
      
    }, error => alert('err'));
  }

}
