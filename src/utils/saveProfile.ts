import { supabase } from "../lib/supabaseClient";
import type { Expense } from "../types/Expense";
import type { Income } from "../types/Income";
import type { CompletedShift } from "../types/Shift";

export const saveProfileInfo = async (
  id: string,
  name: string,
  hourlyRate: number,
) => {
  const { error } = await supabase
    .from("profiles")
    .update({ name, hourly_rate: hourlyRate })
    .eq("id", id);

  if (error) console.log("Error saving profile:", error.message);
};

export const addExpense = async (profileId: string, expense: Expense) => {
  const { error } = await supabase.from("expenses").insert({
    id: expense.id,
    profile_id: profileId,
    date: expense.date,
    amount: expense.amount,
    category: expense.category,
    note: expense.note ?? null,
  });

  if (error) console.log("Error adding expense:", error.message);
};

export const addIncome = async (profileId: string, income: Income) => {
  const { error } = await supabase.from("incomes").insert({
    id: income.id,
    profile_id: profileId,
    date: income.date,
    amount: income.amount,
    category: income.category,
    note: income.note ?? null,
  });

  if (error) console.log("Error adding income:", error.message);
};

export const addCompletedShift = async (
  profileId: string,
  shift: CompletedShift,
) => {
  const { error } = await supabase.from("shifts").insert({
    id: shift.id,
    profile_id: profileId,
    clock_in: shift.clockIn,
    clock_out: shift.clockOut,
    rate: shift.rate,
  });

  if (error) console.log("Error saving shift:", error.message);
};
