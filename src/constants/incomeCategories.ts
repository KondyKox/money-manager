export const INCOME_CATEGORIES = ["Praca", "Prezenty", "Inne"] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
