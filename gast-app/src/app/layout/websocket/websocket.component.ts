import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as moment from 'moment';

import { Subscription } from 'rxjs/Subscription'
import { WebSocketServiceModel } from '../../shared/services/websocket.service.model'

import {Message} from '../../model/websocket';


@Component({
    selector: 'app-websocket',
    templateUrl: './websocket.component.html',
    styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
    private heading: string;
    private socketSubscription: Subscription;
    private messages: Message[] = [];
    private message: Message;
    private connection: boolean = false;
    private CHAT_URL: string = 'ws://localhost:8080/gastwebsocket';

    private sub: any;
    private room: any;

    constructor(
        public socket: WebSocketServiceModel,
        private activate: ActivatedRoute,
    ) {}

    ngOnInit() {
        console.log('ActivatedRoute', this.activate);
        let sub = this.activate
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.room = params['room'] || 0;
            });
        if(this.room){
            this.heading = 'stanza numero ' + this.room;
        }
        this.resetMessage();
    }

    onConnection(){
        if(this.message.author){
            this.socket.connect(this.CHAT_URL);
            this.connection = true;
            console.log('message', this.message);
            this.socketSubscription = this.socket.messages.subscribe((message: string) => {
                try
                {
                    let response = JSON.parse(message);
                    this.messages.push(response);
                }
                catch(Error)
                {
                    this.mapMessage('server', message);
                }
            });
        }
    }

    onSend(){
        if(this.message){
            this.message.newDate = moment().format('DD/MM/YYYY HH:mm:ss');
            this.socket.send(JSON.stringify(this.message));
            this.message.message = null;
        }
    }

    onDestroy() {
        this.socketSubscription.unsubscribe();
        this.connection = false;
        this.messages = [];
    }

    resetMessage(){
        this.message = {
            author: null,
            message: null,
            newDate: moment().format('DD/MM/YYYY HH:mm:ss')
        };
    }


    mapMessage(author, message){
        let remap = {
            author: author,
            message: message,
            newDate: moment().format('DD/MM/YYYY HH:mm:ss')
        };
        this.messages.push(remap);
    }

}
