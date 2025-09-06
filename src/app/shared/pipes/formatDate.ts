// src/app/shared/pipes/format-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string { 
    const datePipe = new DatePipe('es-ES'); 
    return datePipe.transform(value, 'EEEE, dd MMMM yyyy, h:mm a') || '';

  }
}
