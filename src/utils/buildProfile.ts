import { DEFAULT_BG_COLOR } from "../constants/bgPalette";
import type { ShiftRow } from "../types/Shift";
import type { Tables } from "../types/supabase";
import {
  toActiveShift,
  toCompletedShift,
  toExpense,
  toIncome,
  toSaving,
} from "./formatData";

export const buildProfile = (
  p: Tables<"profiles">,
  shifts: Tables<"shifts">[],
  expenses: Tables<"expenses">[],
  incomes: Tables<"incomes">[],
  savings: Tables<"savings">[],
) => ({
  id: p.id,
  name: p.name,
  hourlyRate: p.hourly_rate,
  color: DEFAULT_BG_COLOR,
  activeShift: shifts.filter((s) => !s.clock_out).map(toActiveShift)[0] ?? null,
  completedShifts: shifts
    .filter((s): s is ShiftRow & { clock_out: string } => !!s.clock_out)
    .map(toCompletedShift),
  expenses: expenses.map(toExpense),
  incomes: incomes.map(toIncome),
  savings: savings.map(toSaving),
});
