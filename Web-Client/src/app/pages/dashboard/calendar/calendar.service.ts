import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';
import {Http,Headers, RequestOptions, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class CalendarService {

  constructor(private _baConfig:BaThemeConfigProvider,private _http:Http) {
  }

  getData() {

    let dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-03-08',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      
      events: this._messages
    };
  }

  postEvent(eventData){
    let url = "http://localhost:5000/cal";
    let body = eventData ;
    var data = JSON.stringify(body);
    let headers = new Headers(
        { 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post(url,data, options).subscribe(
            response => {
            }
        );
  }
   commentOperation:Observable<Array<Object>>;

   private _messages = [];

   GetEvent(){
        return this._http.get('http://localhost:5000/calc').map(res => res.json());
    }
  

  }

  

