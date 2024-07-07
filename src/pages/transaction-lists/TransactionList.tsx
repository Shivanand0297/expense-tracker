import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import TransactionTable from "./components/TransactionTable";

const TransactionList = () => {
  const [incomePagination, setIncomePagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [expensePagination, setExpensePagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <TransactionTable
        expenseType="INCOME"
        pagination={incomePagination}
        setPagination={setIncomePagination}
        url={`/income?_page=${incomePagination.pageIndex + 1}&_per_page=${incomePagination.pageSize}`}
      />
      <TransactionTable
        expenseType="EXPENSE"
        pagination={expensePagination}
        setPagination={setExpensePagination}
        url={`/expenses?_page=${expensePagination.pageIndex + 1}&_per_page=${expensePagination.pageSize}`}
      />
    </div>
  );
};

export default TransactionList;
