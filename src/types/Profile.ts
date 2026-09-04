import type { Expense } from "./Expense";
import type { Income } from "./Income";
import type { Saving } from "./Savings";
import type { ActiveShift, CompletedShift } from "./Shift";

export interface Profile {
  id: string;
  name: string;
  hourlyRate: number;
  completedShifts: CompletedShift[];
  activeShift: ActiveShift | null;
  expenses: Expense[];
  incomes: Income[];
  savings: Saving[];
}
