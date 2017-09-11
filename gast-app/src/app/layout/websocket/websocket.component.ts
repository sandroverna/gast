import { Component, OnInit, Injectable } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as moment from 'moment';

import { Subscription } from 'rxjs/Subscription'
import { WebSocketServiceModel } from '../../shared/services/websocket.service.model'

import {Message} from '../../model/websocket';


@Component({
    selector: 'app-websocket',
    templateUrl: './websocket.component.html',
    styleUrls: ['./websocket.component.scss'],
    animations: [routerTransition()]
})
export class WebsocketComponent implements OnInit {
    private socketSubscription: Subscription;
    private messages: Message[] = [];
    private message: string;
    private connection: boolean = false;

    constructor(public socket: WebSocketServiceModel) {}

    ngOnInit() { }

    onConnection(){
        this.socket.connect();
        this.connection = true;
        console.log('socket', this.socket);
        this.socketSubscription = this.socket.messages.subscribe((message: string) => {
            this.mapMessage('server', message);
        });
    }

    onSend(){
        if(this.message){
            this.socket.send(this.message);
            this.message = null;
        }
    }

    onDestroy() {
        this.socketSubscription.unsubscribe();
        this.connection = false;
    }

    mapMessage(emitter, message){
        let now = moment().format('DD/MM/YYYY HH:mm:ss');
        let remap = {
            author: emitter,
            message: message,
            newDate: now
        };
        this.messages.push(remap);
    }

}
