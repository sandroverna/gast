import { Injectable } from "@angular/core";
import { User } from '../../model/user.model';
import {Subject, Observable} from "rxjs";

@Injectable()
export class UserService {
    private user: User;
    private logger = new Subject<boolean>();
    private info = new Subject<any>();

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }

    userInfo(): Observable<any> {
        return this.info.asObservable();
    }

    logIn(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
        this.info.next(user);
        this.logger.next(true);
    }

    logOut() {
        localStorage.removeItem('user');
        this.info.next(null);
        this.logger.next(false);
    }

    reset(): any {
        this.user = {
            type: null
        }
        return this.user;
    }
}
