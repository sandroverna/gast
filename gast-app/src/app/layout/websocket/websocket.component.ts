import { Component, OnInit, Injectable } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ChatService} from '../../shared/services/chat.service';
import {Message} from '../../model/websocket';

@Component({
    selector: 'app-websocket',
    templateUrl: './websocket.component.html',
    styleUrls: ['./websocket.component.scss'],
    animations: [routerTransition()]
})
export class WebsocketComponent implements OnInit {
    private messages: Message[] = [];

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit() {
        this.chatService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }

}
