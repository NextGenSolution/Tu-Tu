import {Pipe, PipeTransform} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';

@Pipe({
    name: 'messageTime',
    pure: false
})
export class BaTimeAgoPipe implements PipeTransform 
{
    value:string;
    timer:string;

    transform(obj:any, args?:any[]):any
    {
           
            this.value = obj;
                        
            if(!this.timer)
            {
               this.timer = this.getObservable();
            }
            return this.timer;
    }

    private getObservable()
    {
            var result:string;
            // current time
            let now = new Date().getTime();

            // time since message was sent in seconds
            let delta = (now - parseInt(this.value)) / 1000;

            // format string
            if (delta < 10)
            {
                result = 'just Now';
            }
            else if (delta < 60)
            { // sent in last minute
                result = 'before' + Math.floor(delta) + ' seconds';
            }
            else if (delta < 3600)
            { // sent in last hour
                result = 'before ' + Math.floor(delta / 60) + ' minutes';
            }
            else if (delta < 86400)
            { // sent on last day
                result = 'before ' + Math.floor(delta / 3600) + ' hours';
            }
            else
            { // sent more than one day ago
                result = 'before ' + Math.floor(delta / 86400) + ' days';
            }
            return result;
       
    };
}
