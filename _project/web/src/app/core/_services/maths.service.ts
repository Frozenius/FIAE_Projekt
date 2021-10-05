import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsService {

  constructor() { }


  /**
   * return the average of all numbers in array
   * @param numbers array of numbers to calculate the average
   * @private
   */
  public static async average(numbers: number[]) {
    const total = numbers.reduce((acc, c) => acc + c, 0);
    return total / numbers.length;
  }
}
