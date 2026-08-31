import { supabase } from "../lib/supabaseClient";
import type { Expense } from "../types/Expense";
import type { Income } from "../types/Income";
import type { CompletedShift } from "../types/Shift";

// DELETING FUNCTIONS
export const deleteExpense = async (id: string) => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) console.error("Error deleting expense:", error.message);
};

export const deleteIncome = async (id: string) => {
  const { error } = await supabase.from("incomes").delete().eq("id", id);
  if (error) console.error("Error deleting income:", error.message);
};

export const deleteShift = async (id: string) => {
  const { error } = await supabase.from("shifts").delete().eq("id", id);
  if (error) console.error("Error deleting shift:", error.message);
};

// UPDATING FUNCTIONS
export const updateExpense = async (expense: Expense) => {
  const { error } = await supabase
    .from("expenses")
    .update({
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      note: expense.note ?? null,
    })
    .eq("id", expense.id);
  if (error) console.error("Error updating expense:", error.message);
};

export const updateIncome = async (income: Income) => {
  const { error } = await supabase
    .from("incomes")
    .update({
      date: income.date,
      amount: income.amount,
      category: income.category,
      note: income.note ?? null,
    })
    .eq("id", income.id);
  if (error) console.error("Error updating income:", error.message);
};

export const updateShift = async (shift: CompletedShift) => {
  const { error } = await supabase
    .from("shifts")
    .update({
      clock_in: shift.clockIn,
      clock_out: shift.clockOut,
      rate: shift.rate,
    })
    .eq("id", shift.id);
  if (error) console.error("Error updating shift:", error.message);
};
