
export enum TransactionCategories {
  SALARY = "SALARY",
  SHOPING = "SHOPING",
  FOOD = "FOOD",
  OTHER = "OTHER",
}

export  interface ITransactionListItem {
  id: string;
  amount: number;
  category: string;
  mode: string;
  date: string;
}