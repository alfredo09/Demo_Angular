import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSubmitOnEnter]',
})
export class AppSubmitOnEnterDirective {
  @Output() enterPressed = new EventEmitter<void>();

  @HostListener('keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.enterPressed.emit();
    }
  }
}
