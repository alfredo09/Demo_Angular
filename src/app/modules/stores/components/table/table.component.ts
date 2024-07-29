import { Component, Input } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { FilterMatchMode } from "primeng/api";
import { Table } from 'primeng/table';
import { messages } from 'src/app/core/constants/messages';
import { TableColumn } from 'src/app/core/interfaces/table-column.interface';
import { labels, titles, buttons, tooltip, mainTitles } from 'src/app/core/constants/labels';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-type.enum';
import { Store } from 'src/app/core/model/store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService, HelpersService]

})
export class TableComponent {

  @Input() stores!: Store[];
  
  public titleStore: any = mainTitles['stores'];
  public selectedStores: Store[] = [];
  public store!: Store;
  public visible: boolean = true;
  public firstPage = 0;
  public columns: TableColumn[] = [];
  public columnsStatus: TableColumn[] = [];
  public columnsToShow: string[] = ['name', 'city', 'openingHours'];
  public types: Record<string, string> | undefined;
  public matchModeContains = [{ label: "Contiene", value: FilterMatchMode.CONTAINS }];
  public messages = messages;
  public labels = labels;
  public titles = titles;
  public buttons = buttons;
  public columnFilterTypes = ColumnFilterType;

  constructor(
    private storesService: StoresService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.initializeColumnInformation();
    this.storesService.triggerTable.next(this);
  }
  
  ngAfterViewInit() {
    this.helpersService.translateChange('es')
  }

  public clear(table: Table) {
    table.clear();
  }

  public reload(): void {
    const data = new Store();
    this.storesService.setFilteredData(data);
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedStore(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedStore(new Store);
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private sendSelectedStore(selectedStore: Store) {
    this.storesService.setSelectedData(selectedStore);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getStoreTableColumnsDefinition();
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