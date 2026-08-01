import type { ExpenseCategory } from "../constants/expenseCategories";

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  note?: string;
}
