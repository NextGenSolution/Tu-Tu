import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';
import {Http,Headers, RequestOptions, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class BaFullCalService {
     constructor(private _http:Http) {
 
    }
    public getMessages():Array<Object> {
    Observable.fromPromise(this.GetMessages());
    return this._messages;
    }

    private _messages = [];
     GetMessages(){
        return new Promise((resolve,reject) => {
            this._http.get('http://localhost:5000/calc').flatMap(res => res.json()).subscribe(
                response => {
                      this._messages.push(response);
                    resolve(null);
                }
            );
        });
    }
}