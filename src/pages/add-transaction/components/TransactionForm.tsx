import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useForm } from "react-hook-form";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// schemas
import api from "@/lib/axiosInstance";
import {
  ITransactionFormSchema,
  transactionCategories,
  transactionFormSchema,
  transactionMode,
} from "@/schemas/transactionFormSchema";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useGlobalLoader } from "@/providers/globalLoaderProvider";
import { wait } from "@/lib/utils";

const TransactionForm = () => {
  const { setIsLoading } = useGlobalLoader();

  const form = useForm<ITransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      category: "SALARY",
      mode: "ONLINE",
      date: moment(new Date()).format("YYYY-MM-DD"),
    },
  });

  async function onSubmit(values: ITransactionFormSchema) {
    try {
      setIsLoading(true);
      // artificially delaying for api call for loader to visible clearly
      await wait();
      if (values.category !== "SALARY") {
        await api.post("/expenses", values);
      } else {
        await api.post("/income", values);
      }

      toast.success("Transaction Successfull");

      // reseting form
      form.reset()
    } catch (error) {
      console.log("Failed to make transaction :", error);
      if (error instanceof AxiosError || error instanceof Error) {
        toast.error(error.message, {
          description: "Transaction failed !",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>List Your Income Or Expense</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionCategories.map((category) => (
                          <SelectItem value={category} key={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transaction Mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionMode.map((mode) => (
                          <SelectItem value={mode} key={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
