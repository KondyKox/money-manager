import { Eye, EyeClosed } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

const AuthPage = ({ mode }: { mode: "login" | "register" }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user, loading, signIn, signUp } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (loading) return null;
  if (user) return <Navigate to={"/"} replace />;

  const checkErrors = () => {
    if (!email) {
      showToast("Email nie może być pusty.", "error");
      return true;
    }

    if (!password) {
      showToast("Hasło nie może być puste.", "error");
      return true;
    }

    if (mode === "register" && password !== repPassword) {
      showToast("Hasła się nie zgadzają.", "error");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkErrors()) return;

    setSubmitting(true);
    try {
      if (mode === "login") {
        await signIn(email.trim(), password);
        showToast("Zalogowano się pomyślnie.", "success");
      } else {
        await signUp(email.trim(), password);
        showToast("Utworzono konto.", "success");
      }
    } catch (error) {
      console.error("Auth error:", error);
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center w-full p-4">
      <form
        onSubmit={handleSubmit}
        className="px-8 lg:px-12 py-12 rounded-2xl shadow-xl shadow-white flex flex-col justify-center items-stretch gap-4 w-full lg:w-1/3"
      >
        <h3 className="text-center font-bold text-xl md:text-2xl border-b-2 pb-2">
          {mode === "login" ? "Logowanie" : "Rejestracja"}
        </h3>
        <div className="flex flex-col justify-center items-center gap-2">
          {/* Email */}
          <div className="input-group">
            <label htmlFor="userEmail">Email</label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="twoj@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="userPass">Hasło</label>
            <div>
              <input
                id="userPass"
                name="userPass"
                type={showPassword ? "text" : "password"}
                placeholder="Twoje sekretne hasło"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            // Repeat Password
            <div className="input-group">
              <label htmlFor="repPass">Powtórz hasło</label>
              <div>
                <input
                  id="repPass"
                  name="repPass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Powtórz swoje hasło"
                  required
                  value={repPassword}
                  onChange={(e) => setRepPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-center">
          {mode === "login" ? "Nie masz konta? " : "Masz już konto? "}
          <Link
            to={mode === "login" ? "/register" : "/login"}
            className="underline font-bold text-blue-300"
          >
            {mode === "login" ? "Zarejestruj się tutaj." : "Zaloguj się tutaj."}
          </Link>
        </p>

        <button disabled={submitting} type="submit" className="btn-secondary">
          {submitting
            ? Array.from("...").map((char, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 0.2}s` }}
                  className="animate-letter-bounce inline-block motion-reduce:animate-none font-mono font-bold"
                >
                  {char}
                </span>
              ))
            : mode === "login"
              ? "Zaloguj się"
              : "Stwórz konto"}
        </button>
      </form>
    </section>
  );
};

export default AuthPage;
