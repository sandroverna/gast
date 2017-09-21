import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AperturaComponent } from './apertura.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [AperturaComponent],
    exports: [AperturaComponent]
})
export class AperturaModule { }
