import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appTitle]',
  standalone: true
})
export class TitleDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.classList.add(
      "px-16",
      "pt-12",
      "pb-6",
      "text-6xl",
      "font-bold",
      "leading-none",
      "tracking-tight",
      "text-primary"
    );
  }

}
