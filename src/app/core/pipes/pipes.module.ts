import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatFieldBooleanPipe } from './format-field-boolean.pipe';
import { FormatFieldDatePipe } from './format-field-date.pipe';
import { FormatFieldEnumPipe } from './format-field-enum.pipe';
import { FormatFieldIncludedPipe } from './format-field-status.pipe';
@NgModule({
  declarations: [
    FormatFieldBooleanPipe,
    FormatFieldDatePipe,
    FormatFieldEnumPipe,
    FormatFieldIncludedPipe
  ],
  imports: [CommonModule],
  exports: [
    FormatFieldBooleanPipe,
    FormatFieldDatePipe,
    FormatFieldEnumPipe,
    FormatFieldIncludedPipe
  ],
})
export class PipesModule {}
