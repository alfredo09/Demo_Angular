import { NgModule } from '@angular/core';
import { AppInputMaskDirective } from 'src/app/core/directives/app-input-mask.directive';
import { AppSubmitOnEnterDirective } from 'src/app/core/directives/app-submit-on-enter.directive';

@NgModule({
  imports: [],
  declarations: [
    AppInputMaskDirective,
    AppSubmitOnEnterDirective
  ],
  exports: [
    AppInputMaskDirective,
    AppSubmitOnEnterDirective
  ]
})
export class DirectivesModule { }
