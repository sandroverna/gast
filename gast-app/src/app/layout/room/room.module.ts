import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { PageHeaderModule, ChatModule, AmmissioneModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        RoomRoutingModule,
        PageHeaderModule,
        ChatModule,
        AmmissioneModule
    ],
    declarations: [RoomComponent]
})
export class RoomModule { }
