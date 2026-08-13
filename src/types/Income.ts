import type { IncomeCategory } from "../constants/incomeCategories";

export interface Income {
  id: string;
  date: string;
  amount: number;
  category: IncomeCategory;
  note?: string;
}
