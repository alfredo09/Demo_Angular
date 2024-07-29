import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableColumn } from 'src/app/core/interfaces/table-column.interface';
import { DetailOrder } from 'src/app/core/model/detail-order';
import { DetailsOrdersService } from '../../services/details-orders.service';
import { FilterMatchMode } from "primeng/api";
import { HelpersService } from 'src/app/core/services/helpers.service';
import { checkAppliedFilters } from 'src/app/core/utils/checkAppliedFilters';
import { mainTitles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { labels, buttons, titles, tooltip } from 'src/app/core/constants/labels';
import { Order } from 'src/app/core/model/order';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-type.enum';
import { CurrenciesEnum } from 'src/app/core/enums/currencies.enum';
import { common } from 'src/app/core/constants/common';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [HelpersService],
})
export class TableComponent implements OnInit {
  @Input() detailsOrders!: DetailOrder[];
  @Input() order!: Order;

  @ViewChild(Table) dtDetailOrder!: Table;

  public titleDetailOrder: any = mainTitles['detailsOrders'];
  public data = new DetailOrder();
  public selectedDetailOrder: DetailOrder[] = [];
  public totalRecords: number = 0;
  public firstPage = 0;
  public types: Record<string, string> = {};
  public columns: TableColumn[] = [];
  public columnsStatus: TableColumn[] = [];
  public columnsToShow: string[] = ['quantity', 'productPrice', 'totalPrice'];
  public matchModeContains = [{ label: "Contiene", value: FilterMatchMode.CONTAINS }];
  public matchModeEquals = [{ label: "Igual a", value: FilterMatchMode.EQUALS }];
  public labels = labels;
  public messages = messages;
  public titles = titles;
  public buttons = buttons;
  public tooltip = tooltip;
  public columnFilterTypes = ColumnFilterType;
  public common = common;
  private detailOrders !: DetailOrder;

  constructor(
    private detailsOrdersService: DetailsOrdersService
  ) { }

  ngOnInit() {
    this.initializeColumnInformation();
    this.detailsOrdersService.triggerTable.next(this);
  }
  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public clear(table: Table) {
    table.clear();
  }

  public reload(): void {
    if (this.order && this.order.id) {
      this.data.orderId = String(this.order.id);
    }
    this.detailsOrdersService.setFilteredData(this.data);
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedDetailOrder(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedDetailOrder(this.detailOrders);
  }

  public sendSelectedDetailOrder(selectedDetailOrder: DetailOrder) {
    this.detailsOrdersService.setSelectedData(selectedDetailOrder);
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  public setCurrencyForFormat(columnDefinition: TableColumn, currency: string): TableColumn {
    const currencyEnum = currency === "Bolivianos" ? CurrenciesEnum.Bolivianos : CurrenciesEnum.Dolares
    return { currency: currencyEnum, ...columnDefinition }
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getDetailOrderTableColumnsDefinition();
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
}
