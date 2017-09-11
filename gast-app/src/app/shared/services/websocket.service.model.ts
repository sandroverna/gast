import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Connection, Socket} from '../../model/websocket/'

export type WebSocketFactory = (url: String) => Socket
const defaultWebsocketFactory = (url: string): Socket => new WebSocket(url);

@Injectable()
export class WebSocketServiceModel {

    public connect(url: string, input: Observable<any>, websocketFactory: WebSocketFactory = defaultWebsocketFactory): Connection {
        const connectionStatus = new BehaviorSubject<number>(0);

        const messages = new Observable<string>(observer => {
            const socket = websocketFactory(url);
            let inputSubscription: Subscription;

            let open = false;
            const closed = () => {
                if (!open)
                    return;

                connectionStatus.next(connectionStatus.getValue() - 1);
                open = false
            };

            socket.onopen = () => {
                open = true;
                connectionStatus.next(connectionStatus.getValue() + 1);
                inputSubscription = input.subscribe(data => {
                    socket.send(data)
                })
            };

            socket.onmessage = message => {
                observer.next(message.data)
            };

            socket.onerror = error => {
                closed();
                observer.error(error)
            };

            socket.onclose = (event: CloseEvent) => {
                closed();
                if (event.wasClean)
                    observer.complete();
                else
                    observer.error(new Error(event.reason))
            };

            return () => {
                if (inputSubscription)
                    inputSubscription.unsubscribe();

                if (socket) {
                    closed();
                    socket.close()
                }
            }
        });

        return {messages, connectionStatus}

    }
}

