import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appCardView]',
  standalone: true
})
export class CardViewDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.classList.add(
      "mx-8",
      "my-3",
      "max-w-xl",
      "rounded",
      "overflow-hidden",
      "shadow-lg",
      "bg-gray-100",
      "hover:bg-gray-700",
      "hover:text-amber-50",
      "hover:duration-500",
    );
  }

}
