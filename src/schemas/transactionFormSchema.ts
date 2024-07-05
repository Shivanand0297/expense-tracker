import { z } from "zod";

export const transactionMode = ["ONLINE", "OFFLINE"] as const;
export const transactionCategories = ["SALARY", "SHOPING", "FOOD", "TRAVELL", "OTHER"] as const;

export const transactionFormSchema = z.object({
  amount: z.number().positive("Amount must be greater then 0"),
  category: z.enum(transactionCategories),
  mode: z.enum(["ONLINE", "OFFLINE"]),
  date: z.string(),
});

export interface ITransactionFormSchema extends z.infer<typeof transactionFormSchema> {}
