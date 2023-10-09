import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSidenav]',
  standalone: true
})
export class SidenavDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('text-gray-800',
      'hover:bg-gray-700',
      'hover:text-amber-50',
      'rounded-md',
      'px-3',
      'py-2',
      'text-sm',
      'font-medium');
  }

}
