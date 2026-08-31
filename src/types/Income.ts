import type { IncomeCategory } from "../constants/incomeCategories";

export interface Income {
  kind: "income";
  id: string;
  date: string;
  amount: number;
  category: IncomeCategory;
  note?: string;
}

export interface IncomeElementProps {
  income: Income;
  onDelete: (id: string) => void;
  onEdit: (income: Income) => void;
}
