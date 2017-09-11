import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketRoutingModule } from './websocket-routing.module';
import { WebsocketComponent } from './websocket.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        WebsocketRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [WebsocketComponent]
})
export class WebsocketModule { }
