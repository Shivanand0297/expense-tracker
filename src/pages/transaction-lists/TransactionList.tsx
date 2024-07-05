// components

import { getExpensesApi, getIncomeApi } from "@/lib/requests";
import TransactionTable from "./components/TransactionTable";

const TransactionList = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <TransactionTable expenseType="INCOME" fetchApi={getIncomeApi} />
      <TransactionTable expenseType="EXPENSE" fetchApi={getExpensesApi} />
    </div>
  );
};

export default TransactionList;
