import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersReq = req.clone({headers: req.headers.set('Access-Control-Expose-Headers', 'pippo, Content-Length')});
        console.log('Request Headers', headersReq.headers);
        return next.handle(headersReq);
    }
}
