import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kFormatter'
})
export class KFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'number') {
      return value;
    }
    //@ts-ignore
    return Math.abs(value) > 999 ? Math.sign(value) * ((Math.abs(value) / 1000).toFixed(0)) + 'k' : Math.sign(value) * Math.abs(value);
  }

}
