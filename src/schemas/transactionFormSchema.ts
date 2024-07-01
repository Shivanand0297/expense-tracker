import { z } from "zod";

export const transactionFormSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.union([z.enum(["SHOPING", "FOOD", "OTHER"]), z.null()]),
  transactionDate: z.date(),
});

export interface ITransactionFormSchema extends z.infer<typeof transactionFormSchema> {}
