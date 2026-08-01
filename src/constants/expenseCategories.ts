export const EXPENSE_CATEGORIES = [
  "Jedzenie",
  "Mieszkanie",
  "Transport",
  "Subskrypcje",
  "Higiena",
  "Randeczki",
  "Inne",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
