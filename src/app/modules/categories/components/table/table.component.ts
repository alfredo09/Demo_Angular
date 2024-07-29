import { Component, Input } from '@angular/core';
import { Category } from 'src/app/core/model/category';
import { CategoriesService } from '../../services/categories.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { FilterMatchMode } from "primeng/api";
import { Table } from 'primeng/table';
import { messages } from 'src/app/core/constants/messages';
import { TableColumn } from 'src/app/core/interfaces/table-column.interface';
import { labels, titles, buttons, tooltip, mainTitles } from 'src/app/core/constants/labels';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-type.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService, HelpersService]

})
export class TableComponent {

  @Input() categories!: Category[];
  
  public titleCategory: any = mainTitles['categories'];
  public selectedCategories: Category[] = [];
  public category!: Category;
  public visible: boolean = true;
  public firstPage = 0;
  public columns: TableColumn[] = [];
  public columnsStatus: TableColumn[] = [];
  public columnsToShow: string[] = ['name', 'description'];
  public types: Record<string, string> | undefined;
  public matchModeContains = [{ label: "Contiene", value: FilterMatchMode.CONTAINS }];
  public messages = messages;
  public labels = labels;
  public titles = titles;
  public buttons = buttons;
  public columnFilterTypes = ColumnFilterType;

  constructor(
    private categoriesService: CategoriesService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.initializeColumnInformation();
    this.categoriesService.triggerTable.next(this);
  }
  
  ngAfterViewInit() {
    this.helpersService.translateChange('es')
  }

  public clear(table: Table) {
    table.clear();
  }

  public reload(): void {
    const data = new Category();
    this.categoriesService.setFilteredData(data);
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedCategory(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedCategory(new Category);
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private sendSelectedCategory(selectedCategory: Category) {
    this.categoriesService.setSelectedData(selectedCategory);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getCategoryTableColumnsDefinition();
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
