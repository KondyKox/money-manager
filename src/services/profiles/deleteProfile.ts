import { supabase } from "../../lib/supabaseClient";
import { translateAuthError } from "../../utils/authErrors";

export const deleteProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", profileId)
    .select("id");

  if (error) throw new Error(translateAuthError(error));
  if (!data || data.length === 0)
    throw new Error("Nie znaleziono profilu do usunięcia.");
};
