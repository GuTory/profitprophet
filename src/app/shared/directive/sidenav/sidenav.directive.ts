import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appSidenav]',
  standalone: true
})
export class SidenavDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.classList.add('text-primary',
      'hover:bg-gray-700',
      'hover:text-amber-50',
      'rounded-md',
      'px-3',
      'py-2',
      'text-sm',
      'font-medium');
  }

}
