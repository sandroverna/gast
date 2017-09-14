import {Injectable} from '@angular/core';
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ExtendedHttpService extends Http {

    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        private router: Router
    ) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('url ', url);
        console.log('intercepting request ', options);
        /*
        console.log('this ', this);
        */
        return super.request(url, options).catch(this.catchErrors());
    }


    private catchErrors() {
        return (res: Response) => {
            console.log('errore http', res.status);
            if (res.status === 401 || res.status === 403) {

            }
            return Observable.throw(res);
        };
    }

}
