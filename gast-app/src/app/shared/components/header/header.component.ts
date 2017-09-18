import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../model/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public user: User;
    public userTypes = ['gestore', 'delegato', 'giudice', 'cancelliere'];

    constructor(
        private translate: TranslateService,
        private userService: UserService,
        public router: Router
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
            console.log('header', this.user)
        });

        /*
         this.router.events.subscribe((val) => {
         if (val instanceof NavigationEnd && window.innerWidth <= 992) {
         this.toggleSidebar();
         }
         });
        */
    }

    ngOnInit() {
        this.user = this.userService.init();
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    onType(type){
        this.user.type = type;
        this.userService.logIn(this.user);
    }

    onLoggedout() {
        this.userService.logOut();
    }
}
