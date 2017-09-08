import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsocketRoutingModule } from './websocket-routing.module';
import { WebsocketComponent } from './websocket.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        WebsocketRoutingModule,
        PageHeaderModule
    ],
    declarations: [WebsocketComponent]
})
export class WebsocketModule { }
