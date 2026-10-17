import { supabase } from "../../lib/supabaseClient";

export const sendPasswordReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  console.error(error);
  if (error)
    throw new Error("Nie udało się wysłać linku. Spróbuj ponownie za chwilę.");
};
