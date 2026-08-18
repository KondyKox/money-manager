import type { ExpenseCategory } from "../constants/expenseCategories";

export interface Expense {
  kind: "expense";
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  note?: string;
}
