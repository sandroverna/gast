import { Injectable } from "@angular/core";
import { User } from '../../model';
import {Subject, Observable} from "rxjs";

@Injectable()
export class UserService {
    private user: User;
    private logger = new Subject<boolean>();
    private info = new Subject<any>();

    init(): any {
        if(localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return this.reset();
        }
    }

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }

    userInfo(): Observable<any> {
        return this.info.asObservable();
    }

    logIn(user: any) {
        console.log('logIn');
        user.isAuth = true;
        localStorage.setItem('user', JSON.stringify(user));
        this.info.next(user);
        this.logger.next(user.isAuth);
    }

    logOut() {
        this.user = this.reset();
        localStorage.setItem('user', JSON.stringify(this.user));
        //localStorage.removeItem('user');
        this.info.next(this.user);
        this.logger.next(false);
    }

    inRoom(room: number) {
        this.user = this.init();
        this.user.room = room;
        this.logIn(this.user);
    }

    reset(): any {
        console.log('reset');
        this.user = {
            isAuth: false,
            type: null
        };
        return this.user;
    }
}
