import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

// add module
import { CookieService } from 'ngx-cookie-service';
import { ModalDialogModule } from 'ngx-modal-dialog';

// services
import { WebSocketServiceModel } from './shared/services/websocket.service.model';
import { QueueingSubject } from './shared/services/queueing.service';
import { NoopInterceptor } from "./shared/services/interceptor.service";
import { UserService } from "./shared/services/user.service";
import { AvvisoService } from "./shared/services/avviso.service";

// pipes
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { UnderscorePipe } from './shared/pipes/underscore.pipe';

// modal
import { DepositoComponent } from "./shared/modules/deposito/deposito.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent,
        UnderscorePipe,
        DepositoComponent
    ],
    entryComponents:[ DepositoComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        ModalDialogModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [
        AuthGuard,
        CookieService,
        WebSocketServiceModel,
        QueueingSubject,
        UserService,
        AvvisoService,
        CurrencyPipe,
        DecimalPipe,
        PercentPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoopInterceptor,
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'it-IT'}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
