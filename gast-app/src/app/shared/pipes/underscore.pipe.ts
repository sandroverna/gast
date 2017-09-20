import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'underscore'
})
export class UnderscorePipe implements PipeTransform {

    transform(value: any): any {
        let result = value;

        /*
        if (value){
            let re = /_/gi;
            result = value.replace(re, " ");
        }
        */
        return result;
    }
}
