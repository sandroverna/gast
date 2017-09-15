import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private client: HttpClient,
        private cookie: CookieService,
    ) { }

    canActivate() {

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

        return true;
    }
}
