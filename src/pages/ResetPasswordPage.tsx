import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { openedFromRecoveryLink } from "../lib/supabaseClient";
import { validateNewPassword } from "../services/auth/validateNewPassword";
import { updateUserPassword } from "../services/auth/updateUser";
import PasswordInput from "../components/ui/PasswordInput";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (loading) return null;

  // Only people who came from the email link may set a password without
  // knowing the old one (a plain logged-in session must not).
  if (!user || !openedFromRecoveryLink) {
    return (
      <section className="flex flex-col justify-center items-center gap-4 w-full p-4 text-center">
        <p>Ten link jest nieprawidłowy lub wygasł.</p>
        <Link
          to="/forgot-password"
          className="underline font-bold text-blue-300"
        >
          Wyślij nowy link.
        </Link>
      </section>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateNewPassword(newPassword, repPassword);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      await updateUserPassword(newPassword);
      showToast("Ustawiono nowe hasło.", "success");
      navigate("/", { replace: true });
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
      console.error("Error resetting password:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center w-full p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="px-8 lg:px-12 py-12 rounded-2xl shadow-xl shadow-white flex flex-col justify-center items-stretch gap-4 w-full lg:w-1/3"
      >
        <h3 className="text-center font-bold text-xl md:text-2xl border-b-2 pb-2">
          Nowe hasło
        </h3>
        <PasswordInput
          id="newPassword"
          label="Nowe hasło"
          autoComplete="new-password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <PasswordInput
          id="repPassword"
          label="Powtórz nowe hasło"
          autoComplete="new-password"
          value={repPassword}
          onChange={setRepPassword}
        />
        <button disabled={submitting} type="submit" className="btn-secondary">
          {submitting ? "Zapisuję..." : "Ustaw hasło"}
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
