import { toYMDdateFormat } from "./dateFormats";

export function paramsForPageable(columnsToShow: any, filterColumn: any) {
    let filterParams = '';
    columnsToShow.map((column:any)=>{
        if (filterColumnIsNotNull(filterColumn, column.name)) {
            let filters: any = extractValuesFilters(filterColumn, column.name, column.type);
            filterParams += `${column.name}=${filters.filter}&`
        }
    })
    return filterParams;
}

export function extractValuesFilters(filterColumn: any, columnName: any, columnType:any) {
    let filterAndSearchType = {
        filter: columnType == 'date' ? toYMDdateFormat(filterColumn[columnName][0].value) : filterColumn[columnName][0].value,
        matchMode: filterColumn[columnName][0].matchMode
    }
    return filterAndSearchType;
}

export function filterColumnIsNotNull(filterColumn: any, columnName: any) {
    if (filterColumn[columnName] && filterColumn[columnName][0] && (filterColumn[columnName][0].value!=null) && filterColumn[columnName][0].matchMode)
        return true;
    else
        return false;
}
