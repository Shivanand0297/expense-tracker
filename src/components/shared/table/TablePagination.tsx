import { Table } from "@tanstack/react-table";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import ShowTableRow from "@/components/shared/table/ShowTableRow";


type TablePaginationProps<TData> = {
  table: Table<TData>;
};

export default function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className="flex items-center justify-end gap-2 py-4 flex-wrap">
      <ShowTableRow table={table} />
      <span className="text-sm mr-2">
        Page{" "}
        <strong>
          {pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <Button variant="outline" size="sm" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
        <ChevronsLeft />
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
        <ChevronsRight />
      </Button>
    </div>
  );
}
