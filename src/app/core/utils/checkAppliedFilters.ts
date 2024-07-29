export function checkAppliedFilters(enabledColumns: any, columnsToShow:any, filtersAppliedColumns:any) {
    const appliedFilters: any = [];
    enabledColumns.map((e: any) => { appliedFilters.push(e.field) });
    const columnsToClose = columnsToShow.filter((column:any)=> !appliedFilters.includes(column));
    const searchFilterInColumn = Object.getOwnPropertyDescriptor(filtersAppliedColumns, String(columnsToClose));    
    return (searchFilterInColumn && searchFilterInColumn.value[0] && searchFilterInColumn.value[0].value);
}
