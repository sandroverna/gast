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
    private th = ['avviso', 'descrizione', 'prezzo base', 'delegato', 'n. offerte', 'stato'];

    constructor(
        private router: Router,
        private activate: ActivatedRoute,
        private userService: UserService,
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
            console.log('home', this.user)
        });
    }

    ngOnInit() {
        this.user = this.userService.init();
        console.log('user home', this.user);
    }

    goRoom(room: number) {
        this.router.navigate(['./room', room]);
    }

}
