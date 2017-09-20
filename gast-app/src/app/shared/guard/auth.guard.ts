import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../model/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
    private user: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private client: HttpClient,
        private cookie: CookieService,
    ) {}

    canActivate() {

        /*
        const url = '/';
        this.client.get(url, {observe: 'response'})
            .subscribe(response => {
                let print = [];
                response.headers.keys().forEach(key => {
                    let header = key + ' => ' + response.headers.getAll(key);
                    print.push(header);
                });
                console.log("HttpClient headers", print);
            });
        */

        console.log('xxxxxxxxxxxxxx');

        /*
        if (localStorage.getItem('user')) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;

         if (localStorage.getItem('user')) {
         return true;
         } else {
         this.router.navigate(['/home']);
         }
        */
        return true;


    }
}
