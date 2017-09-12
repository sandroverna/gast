import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
