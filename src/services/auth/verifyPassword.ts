import { supabase } from "../../lib/supabaseClient";

export const verifyPassword = async (
  userEmail: string,
  confirmPassword: string,
) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: confirmPassword,
  });

  if (error) throw new Error("Nieprawidłowe hasło.");
};
