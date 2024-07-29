import { TableLazyLoadEvent } from 'primeng/table';

export class Pageable {
  page: number | string = '';
  size: number | string = '';
  sortBy: string | string[] = '';
  sortOrder: string = '';

  public setPageableValues(event: TableLazyLoadEvent): void {
    const { first, rows, sortOrder, sortField } = event;
    if (first !== undefined && rows !== undefined && rows !== null && rows !== 0){
      this.page = first / rows;
    } else {
      this.page = '';
    }
    this.size = rows ?? '';
    this.sortOrder = sortOrder === 1 ? 'asc' : 'desc';
    this.sortBy = sortField ?? '';
    if (!sortField) {
      this.setDefaultSortValues();
    }
  }

  public setDefaultSortValues(): void {
    this.sortBy = 'updatedAt';
    this.sortOrder = 'desc';
  }
}
