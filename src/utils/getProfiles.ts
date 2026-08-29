import { DEFAULT_BG_COLOR } from "../constants/bgPalette";
import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../types/Profile";
import type { ShiftRow } from "../types/Shift";
import {
  toActiveShift,
  toCompletedShift,
  toExpense,
  toIncome,
} from "./formatData";

export const getProfiles = async (): Promise<Profile[] | null> => {
  const [profilesRes, shiftsRes, expensesRes, incomesRes] = await Promise.all([
    supabase.from("profiles").select("*"),
    supabase.from("shifts").select("*"),
    supabase.from("expenses").select("*"),
    supabase.from("incomes").select("*"),
  ]);

  if (profilesRes.error) {
    console.log("Error fetching profiles:", profilesRes.error.message);
    return null;
  }

  const profiles = profilesRes.data;
  if (!profiles || profiles.length === 0) {
    console.log("No profiles saved.");
    return null;
  }

  const shifts = shiftsRes.data ?? [];
  const expenses = expensesRes.data ?? [];
  const incomes = incomesRes.data ?? [];

  return profiles.map((p) => ({
    id: p.id,
    name: p.name,
    hourlyRate: p.hourly_rate,
    color: DEFAULT_BG_COLOR,
    activeShift:
      shifts
        .filter((s) => s.profile_id === p.id && !s.clock_out)
        .map(toActiveShift)[0] ?? null,
    completedShifts: shifts
      .filter(
        (s): s is ShiftRow & { clock_out: string } =>
          s.profile_id === p.id && !!s.clock_out,
      )
      .map(toCompletedShift),
    expenses: expenses.filter((e) => e.profile_id === p.id).map(toExpense),
    incomes: incomes.filter((i) => i.profile_id === p.id).map(toIncome),
  }));
};

export const getProfile = async (
  profileId: string,
): Promise<Profile | null> => {
  const profiles = await getProfiles();
  if (!profiles) return null;

  return profiles.find((p) => p.id === profileId) ?? null;
};
