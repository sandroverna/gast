import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../model/user.model';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private user: User;
    private isLoggedIn: boolean;
    private sub: any;
    private th = ['avviso', 'descrizione', 'prezzo base', 'delegato', 'n. offerte', 'stato'];

    constructor(
        private router: Router,
        private activate: ActivatedRoute,
        private userService: UserService,
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
        });
        this.userService.isLoggedIn().subscribe(res => {
            this.isLoggedIn = res;
            if(!this.isLoggedIn){
                this.user = this.userService.reset();
            }
        });
    }

    ngOnInit() {
        if(!this.isLoggedIn){
            this.user = this.userService.reset();
        }
    }

    goRoom(room: number) {
        this.router.navigate(['./websocket'], { queryParams: { room: room } });
    }

}
