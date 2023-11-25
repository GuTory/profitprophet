import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appCardAttribute]',
  standalone: true
})
export class CardAttributeDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.classList.add(
      "inline-block",
      "bg-gray-200",
      "rounded-full",
      "px-3",
      "py-1",
      "text-sm",
      "font-semibold",
      "text-primary",
      "mr-2",
      "mb-2"
    );
  }

}
