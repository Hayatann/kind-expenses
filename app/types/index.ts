export type TransactionType = "income" | "expense";

export type Expense = {
  id: number;
  year: number;
  month: number;
  date: number;
  usage: string;
  amount: number;
  transactionType: TransactionType;
  genre: string;
  who: string;
  memo: string;
};

export type FormData = {
  date: string;
  who: string;
  usage: string;
  genre: string;
  amount: string;
  memo: string;
  transactionType: TransactionType;
};
export type GASResponse = {
  result: "success" | "error";
};
