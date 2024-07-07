import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// components
import DataTable from "@/components/shared/table/DataTable";
import TablePagination from "@/components/shared/table/TablePagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// libs and types
import useFetch from "@/hooks/useFetch";
import { setTablePageCount } from "@/lib/utils";
import { ITransactionListItem } from "@/types/transactionInterface";

type ExpenseListProps = {
  expenseType: "INCOME" | "EXPENSE";
  url: string;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
};

const TransactionTable = ({ url, expenseType, pagination, setPagination }: ExpenseListProps) => {

  const [sorting, setSorting] = useState<SortingState>([]);

  const [transactionList, setTransactionList] = useState<ITransactionListItem[]>([]);
  const [transactionListPageCount, setTransactionListPageCount] = useState(0);

  const { isPending, isError, data } = useFetch<{ data: ITransactionListItem[], items: number }>(url);

  useEffect(() => {

    if(!isPending && !isError && data){
      setTransactionList(data.data);
      setTransactionListPageCount(setTablePageCount(data.items, pagination.pageSize));
    }
  }, [data, isError, isPending, pagination.pageSize])

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
      <CardContent className="overflow-x-scroll">
        <DataTable table={table} columns={columns} />
      </CardContent>
      <CardFooter className="justify-end">
        <TablePagination table={table} />
      </CardFooter>
    </Card>
  );
};

export default TransactionTable;
