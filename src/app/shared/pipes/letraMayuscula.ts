// src/app/shared/pipes/capitalize.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    console.log("aaa");

    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
