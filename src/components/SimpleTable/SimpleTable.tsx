import "./SimpleTable.css";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table'

interface MyComponentProps {
  tableData: any;
  tableColumns: ColumnDef<any, any>[];
}

const SimpleTable = ({tableData, tableColumns}: MyComponentProps) => {
  
  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="simple-table">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default SimpleTable;