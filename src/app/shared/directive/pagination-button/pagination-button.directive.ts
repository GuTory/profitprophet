import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appPaginationButton]',
  standalone: true
})
export class PaginationButtonDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.classList.add(
      "flex",
      "flex-row",
      "items-center",
      "px-6",
      "py-3",
      "shadow-lg",
      "text-primary",
      "hover:bg-gray-700",
      "hover:text-amber-50",
      "rounded"
    );
  }

}
