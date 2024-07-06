import PiechartBreakDown from "@/components/shared/PiechartBreakDown";
import Summary from "@/components/shared/Summary";
import useFetch from "@/hooks/useFetch";
import { ITransactionListItem } from "@/types/transactionInterface";
import { useEffect, useState } from "react";

type TPieChartData = {
  name: string;
  value: number;
};

const Home = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [pieChartData, setPieChartData] = useState<TPieChartData[]>([]);

  const {
    isPending: isExpensesPending,
    isError: isExpensesError,
    data: expenses,
  } = useFetch<ITransactionListItem[]>("/expenses");
  const {
    isPending: isIncomePending,
    isError: isIncomeError,
    data: incomes,
  } = useFetch<ITransactionListItem[]>("/income");

  useEffect(() => {
    if (!isExpensesPending && !isExpensesError && expenses) {
      const total = expenses.reduce((acc, curr) => (acc = acc + curr.amount), 0);
      setTotalExpenses(total);
    }
  }, [expenses, isExpensesError, isExpensesPending]);

  useEffect(() => {
    if (!isIncomePending && !isIncomeError && incomes) {
      const total = incomes.reduce((acc, curr) => (acc = acc + curr.amount), 0);
      setTotalIncome(total);
    }
  }, [incomes, isIncomeError, isIncomePending]);

  useEffect(() => {
    if (incomes && expenses) {
      const categories = [...new Set(expenses.map((exp) => exp.category))];
      const chartData = categories.map((category) => ({
        name: category,
        value: expenses.filter((exp) => exp.category === category).reduce((acc, curr) => acc + curr.amount, 0),
      }));

      setPieChartData(chartData);
    }
  }, [expenses, incomes]);

  return (
    <div>
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Summary amount={totalIncome} type="INCOME" />
        <Summary amount={totalExpenses} type="EXPENSE" />
        <div className="sm:col-span-2">
          <Summary amount={totalIncome - totalExpenses} type="BALANCE" />
        </div>
      </div>
      <PiechartBreakDown data={pieChartData} title="EXPENSE BREAKDOWN" />
    </div>
  );
};

export default Home;
