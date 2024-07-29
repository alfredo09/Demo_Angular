import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { TableColumnType } from 'src/app/core/enums/table-column-type.enum';
import { CurrenciesEnum } from 'src/app/core/enums/currencies.enum';

@Component({
  selector: 'app-table-field-type-formater',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './table-field-type-formater.component.html',
  styleUrls: ['./table-field-type-formater.component.scss']
})
export class TableFieldTypeFormaterComponent {
  @Input({ required: true }) fieldColumnDefinition: any;
  @Input({ required: true }) fieldValue: any;

  public tableColumnTypes = TableColumnType;
  
  private locale = 'es-US';

  public formatToUnit(value: number | string, unit: string): string {
    const parsedValue = this.parseToNumber(value);
    if (isNaN(parsedValue)) {
      return String(value);
    }
    if (unit === 'percent') {
      return new Intl.NumberFormat(
        this.locale,
        {
          style: 'percent',
          unitDisplay: 'long',
          maximumFractionDigits: 6
        }
      ).format(parsedValue / 100)
    }
    return new Intl.NumberFormat(
      this.locale,
      {
        style: unit as 'decimal',
      }
    ).format(parsedValue)
  }

  public formatToAmount(value: number | string, currency: CurrenciesEnum): string {
    const parsedValue = this.parseToNumber(value);
    if (isNaN(parsedValue)) {
      return String(value);
    }
    return this.formatCurrency(parsedValue, currency);
  }

  private formatCurrency(value: number, currency: CurrenciesEnum) {
    return new Intl.NumberFormat(
      this.locale,
      {
        style: 'currency',
        currency
      }
    ).format(value);
  }

  private parseToNumber(value: string | number) {
    return typeof value === 'string' ? Number.parseFloat(value) : value;
  }
}
