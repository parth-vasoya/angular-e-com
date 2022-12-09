import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'range',
  pure: false
})
export class RangePipe implements PipeTransform {

  transform(value: any[], quantity: number) {
    value.length = 0;
    for (let i = 1; i <= quantity; i++) {
      value.push(i);
    }
    return value;
  }
}
