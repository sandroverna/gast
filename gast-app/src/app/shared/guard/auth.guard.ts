import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private activated: ActivatedRoute,
        private cookieService: CookieService,
        private http: Http,
        private client: HttpClient,
    ) { }

    canActivate() {
        /*
        console.log('CookieService', this.cookieService);
        console.log('Cookie', this.cookieService.getAll());
        console.log('Http', this.http);
        console.log('Router', this.router);
        console.log('ActivatedRoute', this.activated);
        */

        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
