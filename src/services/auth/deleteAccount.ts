import { supabase } from "../../lib/supabaseClient";

export const deleteAccount = async () => {
  const { error } = await supabase.rpc("delete_my_account");
  if (error) {
    console.error("Delete account error:", error);
    throw new Error("Nie udało się usunąć konta.");
  }

  const { error: signOutError } = await supabase.auth.signOut({
    scope: "local",
  });
  if (signOutError)
    console.error("Sign out after delete failed:", signOutError);
};
