import { supabase } from "../lib/supabaseClient";

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
