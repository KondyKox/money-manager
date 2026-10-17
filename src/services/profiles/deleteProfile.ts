import { supabase } from "../../lib/supabaseClient";

export const deleteProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", profileId)
    .select("id");

  if (error) throw new Error(error.message);
  if (!data || data.length === 0)
    throw new Error("Nie znaleziono profilu do usunięcia.");
};
