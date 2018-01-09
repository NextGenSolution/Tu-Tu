import {Http,Headers, RequestOptions, HTTP_PROVIDERS} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router}  from '@angular/router';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class BaMsgCenterService {
  constructor(private _http:Http,private _router: Router){

  }
  private _notifications = [
    {
      name: 'Vlad',
      text: 'Vlad posted a new article.',
      time: '1 min ago'
    },
    {
      name: 'Kostya',
      text: 'Kostya changed his contact information.',
      time: '2 hrs ago'
    },
    {
      image: 'assets/img/shopping-cart.svg',
      text: 'New orders received.',
      time: '5 hrs ago'
    },
    {
      name: 'Andrey',
      text: 'Andrey replied to your comment.',
      time: '1 day ago'
    },
    {
      name: 'Nasta',
      text: 'Today is Nasta\'s birthday.',
      time: '2 days ago'
    },
    {
      image: 'assets/img/comments.svg',
      text: 'New comments on your post.',
      time: '3 days ago'
    },
    {
      name: 'Kostya',
      text: 'Kostya invited you to join the event.',
      time: '1 week ago'
    }
  ];

  private _messages = [];

  public getMessages():Array<Object> {
    Observable.fromPromise(this.GetMessages());
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }

    GetMessages(){
        return new Promise((resolve,reject) => {
            this._http.get('http://localhost:5000/chat').flatMap(res => res.json()).subscribe(
                response => {
                      this._messages.push(response);
                    resolve(null);
                }
            );
        });
    }
}
