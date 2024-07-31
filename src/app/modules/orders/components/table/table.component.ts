import { Component, Input, ViewChild } from '@angular/core';
import { Order } from 'src/app/core/model/order';
import { OrdersService } from '../../services/orders.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { FilterMatchMode } from "primeng/api";
import { Table } from 'primeng/table';
import { messages } from 'src/app/core/constants/messages';
import { TableColumn } from 'src/app/core/interfaces/table-column.interface';
import { labels, titles, buttons } from 'src/app/core/constants/labels';
import { mainTitles } from 'src/app/core/constants/labels';
import { common } from 'src/app/core/constants/common';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-type.enum';
import { booleanDropdownOptions } from 'src/app/core/constants/objects-dropdown-options';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService, HelpersService]
})
export class TableComponent {

  @Input() orders!: Order[];
  @ViewChild(Table) dtOrder!: Table;
  
  public titleOrder: any = mainTitles['orders'];
  public selectedOrders: Order[] = [];
  public order!: Order;
  public visible: boolean = true;
  public firstPage = 0;
  public columns: TableColumn[] = [];
  public columnsStatus: TableColumn[] = [];
  public columnsToShow: string[] = ['date', 'isDelivery', 'shippingAddress'];
  public types: Record<string, string> = {};
  public matchModeContains = [{ label: "Contiene", value: FilterMatchMode.CONTAINS }];
  public matchModeEquals = [{ label: "Igual a", value: FilterMatchMode.EQUALS }];
  public matchModeDate = [{ label: "La fecha es", value: FilterMatchMode.DATE_IS }];
  public messages = messages;
  public labels = labels;
  public titles = titles;
  public buttons = buttons;
  public common = common;
  public columnFilterTypes = ColumnFilterType;
  public filterOptions = booleanDropdownOptions;
  public isOrderSelected: boolean = false;
  public isOrderItemSelected: boolean = false;
  public orderSelected: Order = new Order;

  constructor(
    private orderService: OrdersService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.initializeColumnInformation();
    this.orderService.triggerTable.emit(this);
  }
  
  ngAfterViewInit() {
    this.helpersService.translateChange('es')
  }

  public clear(table: Table) {
    table.clear();
  }

  public reload() {
    const data = new Order();
    this.orderService.setFilteredData(data);
  }

  public sendSelectedOrder(order: Order) {
    this.orderService.setSelectedData(order);
  }

  public onRowSelect(event: any) {
    this.sendSelectedOrder(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedOrder(this.order);
  }
  
  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getOrderTableColumnsDefinition();
    this.columnsStatus = this.initializeColumnsStatus();
  }

  private initializeColumnsStatus(): TableColumn[] {
    return this.columns.filter((column) =>
      this.columnsToShow.includes(column.field)
    );
  }

  private updateColumnsDisplay(event: TableColumn[]) {
    this.columnsStatus = event;
    this.columnsToShow = event.map(column => column.field);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
