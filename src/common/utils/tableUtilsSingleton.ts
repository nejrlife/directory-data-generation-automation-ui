import {
  ColumnDef,
  createColumnHelper
} from '@tanstack/react-table'
import { flatMap, uniq, keys, map } from 'lodash'

class TableUtilsSingleton {
  stringy;

  constructor() {
    this.stringy = '';
  }

  getTableColumnHeaders(tableData: any[]): ColumnDef<any, any>[] {
    const columnHelper = createColumnHelper<any>();
    const allKeys = flatMap(tableData, keys);
    const uniqueKeys = uniq(allKeys);
    const columns = [] as Array<ColumnDef<any, any>>
    if (uniqueKeys?.length > 0) {
      for (const uniqueKey of uniqueKeys) {
        const col = columnHelper.accessor(uniqueKey, {
          header: () => uniqueKey,
          cell: info => info.getValue(),
          footer: info => info.column.id,
        });
        columns.push(col);
      }
    }
    return columns;
  }

  getTableColumnHeadersAsString(tableData: any[]): string[] {
    const columnHeaders = this.getTableColumnHeaders(tableData);
    return uniq(map(columnHeaders, 'accessorKey'));;
  }
}

let tableUtilsSingleton: TableUtilsSingleton;

export const getTableUtilsSingleton = (): TableUtilsSingleton => {
  if (!tableUtilsSingleton) {
    tableUtilsSingleton = new TableUtilsSingleton();
  }
  return tableUtilsSingleton;
};
