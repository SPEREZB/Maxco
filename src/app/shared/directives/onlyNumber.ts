import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  
  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = event.target.value; 
    event.target.value = initialValue.replace(/\D/g, '');  
  }
  
}
 