import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'cutLength'
})
export class CutLengthPipe implements PipeTransform {

   transform(value: string, length: number): string {
      if (value.length > length) {
         return value.slice(0, length) + '...';
      }

      return value;
   }

}
