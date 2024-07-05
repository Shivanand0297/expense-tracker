import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// components
import DataTable from "@/components/shared/table/DataTable";
import TablePagination from "@/components/shared/table/TablePagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// libs and types
import { setTablePageCount } from "@/lib/utils";
import { ITransactionListItem } from "@/types/transactionInterface";

type ExpenseListProps = {
  expenseType: "INCOME" | "EXPENSE",
  fetchApi: (data: PaginationState) => Promise<AxiosResponse>
}

const TransactionTable = ({ fetchApi, expenseType }: ExpenseListProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [transactionList, setTransactionList] = useState<ITransactionListItem[]>([]);
  const [transactionListPageCount, setTransactionListPageCount] = useState(0);

  const getTransactionListHandler = useCallback(async () => {
    try {
      const { data } = await fetchApi({ pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize });

      setTransactionList(data.data);
      setTransactionListPageCount(setTablePageCount(data.items, pagination.pageSize));
    } catch (error) {
      console.log("Error fetching transactions: ", error);
      if (error instanceof AxiosError || error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [fetchApi, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    getTransactionListHandler();
  }, [getTransactionListHandler]);

  const columns = useMemo<ColumnDef<ITransactionListItem>[]>(
    () => [
      {
        accessorKey: "amount",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "mode",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Mode
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "date",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Created At
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const date = row.original.date;
          return <span>{moment(date).format("LL")}</span>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactionList ?? [],
    columns,
    pageCount: transactionListPageCount,
    manualPagination: true, //we're doing manual "server-side" pagination
    // debugTable: true,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{expenseType}</CardTitle>
        <CardDescription className="capitalize">All {expenseType} Listing</CardDescription>
        <div className="flex flex-wrap items-center justify-end">
          <Button>
            <Link to="/transaction-init">
              <span className="flex items-center gap-2">
                <PlusCircle className="size-4 shrink-0" /> Add Transaction
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={columns} />
      </CardContent>
      <CardFooter className="justify-end">
        <TablePagination table={table} />
      </CardFooter>
    </Card>
  );
};

export default TransactionTable;
