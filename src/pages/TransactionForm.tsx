import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// schemas
import { ITransactionFormSchema, transactionFormSchema } from "@/schemas/transactionFormSchema";

const TransactionForm = () => {
  // 1. Define your form.
  const form = useForm<ITransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      category: null,
      transactionDate: new Date(),
      type: "INCOME",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ITransactionFormSchema) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>List Your Income Or Expense</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" type="number" {...field} />
                  </FormControl>
                  <FormDescription>This is your income or expense.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
