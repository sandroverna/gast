import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderscorePipe } from './underscore.pipe';

@NgModule({
    declarations:[UnderscorePipe],
    imports: [CommonModule],
    exports: [UnderscorePipe]
})
export class MainPipeModule {}
