import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { WebSocketServiceModel } from '../../../shared/services/websocket.service.model'
import { UserService } from '../../../shared/services/user.service';
import { AppSettings } from '../../../appSettings';

import { Message } from '../../../model/websocket';
import { User } from '../../../model/user.model';

import * as moment from 'moment';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    private user: User;

    private heading: string;
    private socketSubscription: Subscription;
    private messages: Message[] = [];
    private message: Message;
    private connection: boolean = false;

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
        this.resetMessage();
        this.onConnection(this.user.room);
    }

    onConnection(avviso){
        if(this.message.author){
            this.socket.connect(AppSettings.WS_CHAT + '?room=' + avviso);
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
            author: this.user.type,
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
