import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { WebSocketServiceModel } from '../../shared/services/websocket.service.model'
import { UserService } from '../../shared/services/user.service';

import { Message } from '../../model/websocket';
import { User } from '../../model/user.model';

import * as moment from 'moment';

@Component({
    selector: 'app-websocket',
    templateUrl: './websocket.component.html',
    styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
    private user: User;

    private heading: string;
    private socketSubscription: Subscription;
    private messages: Message[] = [];
    private message: Message;
    private connection: boolean = false;
    private CHAT_URL: string = 'ws://localhost:8080/gastwebsocket';

    constructor(
        public socket: WebSocketServiceModel,
        private userService: UserService
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
            console.log('chat', this.user)
        });
    }

    ngOnInit() {
        this.user = this.userService.init();
        if(this.user.room){
            this.heading = 'stanza numero ' + this.user.room;
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
