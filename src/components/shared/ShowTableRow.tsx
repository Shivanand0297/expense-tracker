import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

type ShowTableProps<TData> = {
  table: Table<TData>;
};

export default function ShowTableRow<TData>({ table }: ShowTableProps<TData>) {

  const selectOptions = [50, 75, 100, 150]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Rows per page</span>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {selectOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
