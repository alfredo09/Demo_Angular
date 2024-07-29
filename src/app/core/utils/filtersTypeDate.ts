import { typeDateForFilters} from 'src/app/core/utils/dateFormats';

export function resetValuesTypeStringDate(items: any, valuesToFind: string[]) {
    for (let item of items) {
        valuesToFind.map(value => {
            if (item.hasOwnProperty(value)) 
                item[value] = typeDateForFilters(item[value]);
        })
    }
    return items;
}
