import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { PageHeaderModule, ChatModule, AmmissioneModule, AperturaModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        RoomRoutingModule,
        PageHeaderModule,
        ChatModule,
        AmmissioneModule,
        AperturaModule
    ],
    declarations: [RoomComponent]
})
export class RoomModule { }
