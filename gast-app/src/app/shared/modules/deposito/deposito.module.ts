import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DepositoComponent } from './deposito.component';

@NgModule({
    imports: [ FormsModule ],
    declarations: [DepositoComponent],
    entryComponents: [DepositoComponent],
    exports: [DepositoComponent]
})
export class DepositoModule { }
