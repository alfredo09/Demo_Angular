import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { TableColumnType } from 'src/app/core/enums/table-column-type.enum';

@Component({
  selector: 'app-table-field-info-mode',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './table-field-info-mode.component.html',
  styleUrls: ['./table-field-info-mode.component.scss']
})
export class TableFieldInfoModeComponent {
  @Input({ required: true }) fieldColumnDefinition: any;
  @Input({ required: true }) fieldValue: any;

  public tableColumnTypes = TableColumnType;
  
}
