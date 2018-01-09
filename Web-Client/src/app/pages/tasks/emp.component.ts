import {Component,Input} from '@angular/core'

@Component({
    selector:'empTile',
    template: `
    <div class="media">
        <div class="media-left">
            <img class="media-object" src="http://lorempixel.com/60/60/people?{{size}}">
        </div>
        <div class="media-body">
            <h6 class="media-heading">
                {{ data.name }}
            </h6>   
        </div>
    </div>
    `,
    styles: [`
    .media {
        margin-bottom: 10px;}}
     }
        
    .media-object {
        border-radius: 10px;
    }
    `]
})

export class Tile{
    num;
    url;
    @Input() data;
    @Input() size;
     constructor(){
        console.log(this.data);
        this.num = this.size;
        this.url = "http://lorempixel.com/60/60/people?"+this.num;
    }
}