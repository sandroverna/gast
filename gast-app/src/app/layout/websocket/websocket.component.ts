import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-websocket',
    templateUrl: './websocket.component.html',
    styleUrls: ['./websocket.component.scss'],
    animations: [routerTransition()]
})
export class WebsocketComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
