// src/app/shared/directives/min-value.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMinValue]'
})
export class MinValueDirective {
  @Input() minValue: number = 1;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const numberValue = parseInt(value, 10);
    if (numberValue < this.minValue) {
      this.el.nativeElement.value = this.minValue;
    }
  }
}
