import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { routerTransition } from '../../router.animations';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    goRoom(room: number) {
        this.router.navigate(['./websocket'], { queryParams: { room: room } });
    }

}
