export const EXPENSE_CATEGORIES = [
  "Oszczędności",
  "Jedzenie",
  "Mieszkanie",
  "Transport",
  "Subskrypcje",
  "Opłaty",
  "Higiena",
  "Randeczki",
  "Inne",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
