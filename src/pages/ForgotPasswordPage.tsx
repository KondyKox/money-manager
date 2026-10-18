import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { sendPasswordReset } from "../services/auth/sendPasswordReset";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user, loading } = useAuth();
  const { showToast } = useToast();

  if (loading) return null;
  // Logged in users can do this from Settings.
  if (user) return <Navigate to={"/settings"} replace />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("Email nie może być pusty.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      // Same message whether the account exists or not.
      showToast(
        "Jeśli konto istnieje, wysłaliśmy link do zmiany hasła.",
        "success",
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
      console.error("Error sending password reset:", error);
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
          Reset hasła
        </h3>
        <p className="text-sm text-center">
          Podaj email konta, a wyślemy Ci link do ustawienia nowego hasła.
        </p>
        <div className="input-group">
          <label htmlFor="resetEmail">Email</label>
          <input
            id="resetEmail"
            name="resetEmail"
            type="email"
            placeholder="twoj@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <p className="text-xs text-center">
          <Link to="/login" className="underline font-bold text-blue-300">
            Wróć do logowania.
          </Link>
        </p>

        <button disabled={submitting} type="submit" className="btn-secondary">
          {submitting ? "Wysyłam..." : "Wyślij link"}
        </button>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
