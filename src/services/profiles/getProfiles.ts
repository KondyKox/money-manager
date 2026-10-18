import { supabase } from "../../lib/supabaseClient";
import type { Profile } from "../../types/Profile";
import { buildProfile } from "../../utils/buildProfile";

export const getProfiles = async (): Promise<Profile[]> => {
  const [profilesRes, shiftsRes, expensesRes, incomesRes, savingsRes] =
    await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("shifts").select("*"),
      supabase.from("expenses").select("*"),
      supabase.from("incomes").select("*"),
      supabase.from("savings").select("*"),
    ]);

  if (profilesRes.error) {
    console.error("Error fetching profiles:", profilesRes.error.message);
    throw new Error("Nie udało się pobrać profili.");
  }

  const profiles = profilesRes.data;
  if (!profiles || profiles.length === 0) {
    const profiles = profilesRes.data ?? [];
    if (profiles.length === 0) return [];
  }

  const shifts = shiftsRes.data ?? [];
  const expenses = expensesRes.data ?? [];
  const incomes = incomesRes.data ?? [];
  const savings = savingsRes.data ?? [];

  return profiles.map((p) =>
    buildProfile(
      p,
      shifts.filter((s) => s.profile_id === p.id),
      expenses.filter((e) => e.profile_id === p.id),
      incomes.filter((i) => i.profile_id === p.id),
      savings.filter((s) => s.profile_id === p.id),
    ),
  );
};

export const getProfile = async (
  profileId: string,
): Promise<Profile | null> => {
  const [profileRes, shiftsRes, expensesRes, incomesRes, savingsRes] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", profileId).maybeSingle(),
      supabase.from("shifts").select("*").eq("profile_id", profileId),
      supabase.from("expenses").select("*").eq("profile_id", profileId),
      supabase.from("incomes").select("*").eq("profile_id", profileId),
      supabase.from("savings").select("*").eq("profile_id", profileId),
    ]);

  const failed = [
    profileRes,
    shiftsRes,
    expensesRes,
    incomesRes,
    savingsRes,
  ].find((res) => res.error);
  if (failed?.error) {
    console.error("Error fetching profile:", failed.error.message);
    throw new Error("Nie udało się pobrać profilu.");
  }

  if (!profileRes.data) return null; // not found

  return buildProfile(
    profileRes.data,
    shiftsRes.data ?? [],
    expensesRes.data ?? [],
    incomesRes.data ?? [],
    savingsRes.data ?? [],
  );
};
