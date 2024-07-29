import { AfterViewInit, Directive, OnDestroy, Renderer2 } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import Inputmask from 'inputmask';

@Directive({
  selector: '[dateMask]',
})
export class AppInputMaskDirective implements AfterViewInit, OnDestroy {
  private mask: any;

  constructor(private primeCalendar: Calendar, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.mask = new Inputmask(this.getDateMask());
    this.mask.mask(this.getHTMLInput());
  }

  ngOnDestroy() {
    if (this.mask) {
      this.mask.remove();
    }
  }

  getHTMLInput(): HTMLInputElement {
    return this.renderer.selectRootElement(
      this.primeCalendar.el.nativeElement.querySelector('input')
    );
  }

  getDateMask(): string {
    return '99/99/9999';
  }
}
