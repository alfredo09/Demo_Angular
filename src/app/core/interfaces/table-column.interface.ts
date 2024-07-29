import { CurrenciesEnum } from "../enums/currencies.enum";
import { TableColumnType } from "../enums/table-column-type.enum";
import { DropdownOption } from "./dropdown-option.interface";

export interface TableColumn {
  field: string;
  header: string;
  filterType?: string;
  columnType?: TableColumnType;
  colSpan?: number;
  isDate?: boolean;
  format?: string;
  state?: boolean;
  width?: number;
  code?: string;
  iconExpand?: boolean;
  infoExpand?: boolean;
  currency?: CurrenciesEnum;
  dateFormat?: string;
  unit?: string;
  enumFilterDropdownOptions?: DropdownOption[];
  enumType?: any;
}
