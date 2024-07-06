import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, numberToCurrency } from "@/lib/utils";

type SummaryProps = {
  type: "EXPENSE" | "INCOME" | "BALANCE";
  amount: number;
};

const Summary = ({ type, amount }: SummaryProps) => {
  return (
    <Card
      className={cn("transition-shadow ease-in-out hover:shadow-md", {
        "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400": type === "EXPENSE",
        "bg-lime-50 text-lime-500 dark:bg-lime-950 dark:text-lime-400": type === "INCOME",
        "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400": type === "BALANCE",
      })}
    >
      <CardHeader className="pb-2">
        <CardDescription className="text-foreground dark:text-white font-semibold">{type}</CardDescription>
        <CardTitle className={cn("text-4xl")}>{numberToCurrency(amount)}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Summary;
