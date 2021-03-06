import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private translate: TranslateService
    ) {
        console.log('app component');

        translate.addLangs(['it', 'en', 'fr', 'ur', 'es', 'fa']);
        translate.setDefaultLang('it');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/it|en|fr|ur|es|fa/) ? browserLang : 'it');
    }
}
