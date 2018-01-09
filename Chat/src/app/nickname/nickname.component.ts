import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {URLSearchParams} from "@angular/http";
import { UserService } from "../shared";

declare var require;
const styles: string = require('./nickname.component.scss');
const template: string = require('./nickname.component.html');

@Component({
    selector: 'nickname',
    styles: [styles],
    template
})

export class NicknameComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
        let params = new URLSearchParams(window.location.search);
        if(window.location.search.split('&')[1] != undefined){
        this.nickname =  window.location.search.split('&')[0].replace('?' , '');
            this.save();
        }
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    save(): void {
        this.userService.nickname = this.nickname;
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
