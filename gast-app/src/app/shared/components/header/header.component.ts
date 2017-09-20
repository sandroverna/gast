import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { AvvisoService } from '../../../shared/services/avviso.service';
import { User, Avviso } from '../../../model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public user: User;
    public avviso: Avviso;
    public userRoles = ['gestore', 'delegato', 'giudice', 'cancelliere'];

    constructor(
        private activate: ActivatedRoute,
        private userService: UserService,
        private avvisoService: AvvisoService,
        public router: Router
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
        });
        this.avvisoService.avvisoInfo().subscribe(res => {
            this.avviso = res;
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
        this.avviso = this.avvisoService.avvisoByRoute(this.router.url);
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
        this.router.navigate(['./home']);
        this.userService.logOut();
        this.avvisoService.avvisoUnselect();
    }
}
