// src/app/shared/directives/only-numbers.directive.ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (!/^\d+$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
