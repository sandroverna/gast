import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../model/user.model';
import * as moment from 'moment';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    private user: User;
    private sub: any;
    private room: any;

    constructor(
        private router: Router,
        private activate: ActivatedRoute,
        private userService: UserService,
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
            console.log('room', this.user)
        });
    }

    ngOnInit() {
        this.user = this.userService.init();
        this.sub = this.activate.params.subscribe(params => {
            this.room = +params['room'] || 0;
            this.userService.inRoom(this.room)
        });
    }

}
