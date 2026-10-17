import { supabase } from "../../lib/supabaseClient";
import type { Expense } from "../../types/Expense";
import type { Income } from "../../types/Income";
import type { Saving } from "../../types/Savings";
import type { CompletedShift } from "../../types/Shift";

// DELETING FUNCTIONS
export const deleteExpense = async (id: string) => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) {
    console.error("Error deleting expense:", error.message);
    throw new Error("Nie udało się usunąć wydatku.");
  }
};

export const deleteIncome = async (id: string) => {
  const { error } = await supabase.from("incomes").delete().eq("id", id);
  if (error) {
    console.error("Error deleting income:", error.message);
    throw new Error("Nie udało się usunąć przychodu.");
  }
};

export const deleteShift = async (id: string) => {
  const { error } = await supabase.from("shifts").delete().eq("id", id);
  if (error) {
    console.error("Error deleting shift:", error.message);
    throw new Error("Nie udało się usunąć zmiany.");
  }
};

export const deleteSaving = async (id: string) => {
  const { error } = await supabase.from("savings").delete().eq("id", id);
  if (error) {
    console.error("Error deleting saving:", error.message);
    throw new Error("Nie udało się usunąć oszczędności.");
  }
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
  if (error) {
    console.error("Error updating expense:", error.message);
    throw new Error("Nie udało się zaktualizować wydatku.");
  }
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
  if (error) {
    console.error("Error updating income:", error.message);
    throw new Error("Nie udało się zaktualizować przychodu.");
  }
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
  if (error) {
    console.error("Error updating shift:", error.message);
    throw new Error("Nie udało się zaktualizować zmiany.");
  }
};

export const updateSaving = async (saving: Saving) => {
  const { error } = await supabase
    .from("savings")
    .update({
      id: saving.id,
      date: saving.date,
      amount: saving.amount,
    })
    .eq("id", saving.id);
  if (error) {
    console.error("Error updating saving:", error.message);
    throw new Error("Nie udało się zaktualizować oszczędności.");
  }
};
