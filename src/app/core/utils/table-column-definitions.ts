import { TableColumn } from "../interfaces/table-column.interface";
import { labels } from "../constants/labels";
import { TableColumnType } from "../enums/table-column-type.enum";
import { formatDateTable } from "./format-date";
import { environment } from "../environments/environment.development";
import { ColumnFilterType } from "../enums/column-filter-type.enum";

export class TableColumnDefinitions {
    static getCategoryTableColumnsDefinition(): TableColumn[] {
        return [
            {
                field: 'name',
                header: labels.name,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'description',
                header: labels.description,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
        ];
    }
    static getStoreTableColumnsDefinition(): TableColumn[] {
        return [
            {
                field: 'name',
                header: labels.name,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'city',
                header: labels.city,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'openingHours',
                header: labels.openingHours,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
        ];
    }
    static getProductTableColumnsDefinition(): TableColumn[] {
        return [
            {
                field: 'name',
                header: labels.name,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'description',
                header: labels.description,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'stock',
                header: labels.stock,
                columnType: TableColumnType.TEXT,
                filterType: ColumnFilterType.TEXT,
            },
            {
                field: 'price',
                header: labels.price,
                columnType: TableColumnType.AMOUNT,
                filterType: ColumnFilterType.AMOUNT,
            },
            {
                field: 'registrationDate',
                header: labels.registrationDate,
                columnType: TableColumnType.DATE,
                filterType: ColumnFilterType.DATE,
                format: `dd/MM/yyyy`
            },
            {
                field: 'active',
                header: labels.active,
                columnType: TableColumnType.BOOLEAN,
                filterType: ColumnFilterType.BOOLEAN,
            },
        ];
    }

    static getOrderTableColumnsDefinition(): TableColumn[] {
        return [
            {
                field: 'name',
                header: labels.name,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },            
            {
                field: 'date',
                header: labels.date,
                columnType: TableColumnType.DATE,
                filterType: ColumnFilterType.DATE,
                format: formatDateTable(environment.formatDate)
            },
            {
                field: 'isDelivery',
                header: labels.isDelivery,
                columnType: TableColumnType.BOOLEAN,
                filterType: ColumnFilterType.BOOLEAN,
            },
            {
                field: 'shippingAddress',
                header: labels.shippingAddress,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
            },
            {
                field: 'storeName',
                header: labels.storeName,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
                iconExpand: true,
            },  
            {
                field: 'city',
                header: labels.city,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
                infoExpand: true
            }, 
            {
                field: 'openingHours',
                header: labels.openingHours,
                columnType: TableColumnType.TEXT,
                filterType: 'text',
                infoExpand: true
            }, 
        ];
    }

    static getDetailOrderTableColumnsDefinition(): TableColumn[] {
        return [
            {
                field: 'quantity',
                header: labels.quantity,
                columnType: TableColumnType.NUMERIC,
                filterType: ColumnFilterType.NUMERIC,
            },
            {
                field: 'productPrice',
                header: labels.productPrice,
                columnType: TableColumnType.AMOUNT,
                filterType: ColumnFilterType.AMOUNT,
            },
            {
                field: 'totalPrice',
                header: labels.totalPrice,
                columnType: TableColumnType.AMOUNT,
                filterType: ColumnFilterType.AMOUNT,
            },
        ];
    }

}
