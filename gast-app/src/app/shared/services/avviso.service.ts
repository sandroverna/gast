import { Injectable } from "@angular/core";
import { Avviso } from '../../model';
import {Subject, Observable} from "rxjs";

@Injectable()
export class AvvisoService {
    private avviso: Avviso;
    private info = new Subject<any>();

    init(): any {
        if(localStorage.getItem('avviso')){
            return JSON.parse(localStorage.getItem('avviso'));
        } else {
            return this.reset();
        }
    }

    avvisoInfo(): Observable<any> {
        return this.info.asObservable();
    }

    avvisoSelect(avviso: any) {
        console.log('avvisoSelect');
        localStorage.setItem('avviso', JSON.stringify(avviso));
        this.info.next(avviso);
    }

    avvisoUnselect() {
        this.avviso = this.reset();
        localStorage.setItem('user', JSON.stringify(this.avviso));
        //localStorage.removeItem('user');
        this.info.next(this.avviso);
    }

    reset(): any {
        console.log('reset');
        this.avviso = {
            id: null,
            state: null
        };
        return this.avviso;
    }
}
