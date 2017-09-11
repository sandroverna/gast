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

    constructor(private socket: WebSocketServiceModel) {}

    ngOnInit() {
        this.socket.connect();

        this.socketSubscription = this.socket.messages.subscribe((message: string) => {
            console.log('received message from server: ', message);
            this.mapMessage('server', message);
        });

        // send message to server, if the socket is not connected it will be sent
        // as soon as the connection becomes available thanks to QueueingSubject
        this.socket.send('hello');
    }

    ngOnDestroy() {
        this.socketSubscription.unsubscribe()
    }

    mapMessage(emitter, message){
        let now = moment().format('DD/MM/YYYY HH:mm');
        let remap = {
            author: emitter,
            message: message,
            newDate: now
        }
        this.messages.push(remap);
    }

}
