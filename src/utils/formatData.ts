import type { Expense } from "../types/Expense";
import type { Income } from "../types/Income";
import type { ShiftRow } from "../types/Shift";
import type { Database } from "../types/supabase";

export const toActiveShift = (s: ShiftRow) => ({
  id: s.id,
  clockIn: s.clock_in,
  clockOut: s.clock_out ?? undefined,
  rate: s.rate,
});

export const toCompletedShift = (s: ShiftRow & { clock_out: string }) => ({
  id: s.id,
  clockIn: s.clock_in,
  clockOut: s.clock_out,
  rate: s.rate,
});

export const toExpense = (
  e: Database["public"]["Tables"]["expenses"]["Row"],
): Expense => ({
  kind: "expense",
  id: e.id,
  date: e.date,
  amount: e.amount,
  category: e.category,
  note: e.note ?? undefined,
});

export const toIncome = (
  i: Database["public"]["Tables"]["incomes"]["Row"],
): Income => ({
  kind: "income",
  id: i.id,
  date: i.date,
  amount: i.amount,
  category: i.category,
  note: i.note ?? undefined,
});
