import { supabase } from "../../lib/supabaseClient";

export const updateUserEmail = async (newEmail: string) => {
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) throw new Error("Nie udało się zmienić adresu email.");
};

export const updateUserPassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw new Error("Nie udało się zmienić hasła.");
};
